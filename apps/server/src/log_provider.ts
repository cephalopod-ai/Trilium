import { FileBasedLogService, type LogFileInfo } from "@triliumnext/core";
import type { Request, Response } from "express";
import fs from "fs";
import { EOL } from "os";
import path from "path";

import config, { LOGGING_DEFAULT_RETENTION_DAYS } from "./services/config.js";
import dataDir from "./services/data_dir.js";

const LOG_FILE_PATTERN = /^trilium-\d{4}-\d{2}-\d{2}\.log$/;

const requestBlacklist = [
    "/app",
    "/images",
    "/stylesheets",
    "/api/recent-notes",
    "/api/backend-log",
    // Docker probes this every 30 seconds, and the container runtime captures the echo too.
    "/api/health-check"
];

export default class ServerLogService extends FileBasedLogService {
    private logFile: fs.WriteStream | undefined;
    private retryLogFileAt = 0;

    constructor() {
        super();
        // Server uses sync initialization since Node.js fs operations are sync
        this.ensureLogDirectory();
        this.todaysMidnight = this.getTodaysMidnight();
        this.openLogFile(this.getLogFileName());
    }

    // ==================== Abstract Method Implementations ====================

    protected override get eol(): string {
        return EOL;
    }

    protected override ensureLogDirectory(): void {
        fs.mkdirSync(dataDir.LOG_DIR, { recursive: true, mode: 0o700 });
    }

    protected override openLogFile(fileName: string): void {
        if (Date.now() < this.retryLogFileAt) return;
        try {
            const stream = fs.createWriteStream(path.join(dataDir.LOG_DIR, fileName), { flags: "a" });
            this.logFile = stream;
            this.retryLogFileAt = 0;
            stream.on("error", (error) => {
                // An old stream can fail while a rotation has already opened its replacement.
                if (this.logFile === stream) {
                    this.logFile = undefined;
                    this.handleLogFileError(error);
                }
                stream.destroy();
            });
        } catch (error) {
            this.logFile = undefined;
            this.handleLogFileError(error);
        }
    }

    private handleLogFileError(error: unknown): void {
        this.retryLogFileAt = Date.now() + 30_000;
        // Never feed an I/O failure back into the failed logger. Normal entries still echo
        // to stdout, and the next write after the backoff tries the current day's file.
        console.error("Unable to write the Trilium log file; retrying in 30 seconds.", error);
    }

    protected override closeLogFile(): void {
        if (this.logFile) {
            this.logFile.end();
            this.logFile = undefined;
        }
    }

    protected override writeEntry(entry: string): void {
        if (!this.logFile && this.retryLogFileAt) this.openLogFile(this.getLogFileName());
        try {
            this.logFile?.write(entry);
        } catch (error) {
            const stream = this.logFile;
            this.logFile = undefined;
            this.handleLogFileError(error);
            stream?.destroy();
        }
    }

    protected override echoToConsole(str: string): void {
        // Under vitest every console call is forwarded to the main process over the worker RPC, and
        // this suite emits tens of thousands of them — the hidden-subtree bootstrap alone logs a
        // line per created note, for each of the ~60 spec files that build the app. A call still in
        // flight when its worker tears down surfaces as an unhandled
        // `EnvironmentTeardownError: Closing rpc while "onUserConsoleLog" was pending`, which fails
        // the run even though every test passed. The entry is still written to the log file, so
        // nothing that reads the log is affected.
        if (process.env.VITEST) {
            return;
        }
        super.echoToConsole(str);
    }

    protected override readLogFile(fileName: string): string | null {
        const filePath = path.join(dataDir.LOG_DIR, fileName);
        try {
            return fs.readFileSync(filePath, "utf8");
        } catch {
            return null;
        }
    }

    protected override async listLogFiles(): Promise<LogFileInfo[]> {
        const files = await fs.promises.readdir(dataDir.LOG_DIR);
        const logFiles: LogFileInfo[] = [];

        for (const file of files) {
            if (!LOG_FILE_PATTERN.test(file)) {
                continue;
            }

            const filePath = path.join(dataDir.LOG_DIR, file);

            // Security: Verify path stays within LOG_DIR
            const resolvedPath = path.resolve(filePath);
            const resolvedLogDir = path.resolve(dataDir.LOG_DIR);
            if (!resolvedPath.startsWith(resolvedLogDir + path.sep)) {
                continue;
            }

            try {
                const stats = await fs.promises.stat(filePath);
                logFiles.push({ name: file, mtime: stats.mtime });
            } catch {
                // Skip files we can't stat
            }
        }

        return logFiles;
    }

    protected override async deleteLogFile(fileName: string): Promise<void> {
        const filePath = path.join(dataDir.LOG_DIR, fileName);

        // Security: Verify path stays within LOG_DIR
        const resolvedPath = path.resolve(filePath);
        const resolvedLogDir = path.resolve(dataDir.LOG_DIR);
        if (!resolvedPath.startsWith(resolvedLogDir + path.sep)) {
            return;
        }

        await fs.promises.unlink(filePath);
    }

    protected override getRetentionDays(): number {
        const customRetentionDays = config.Logging.retentionDays;
        if (customRetentionDays !== undefined && customRetentionDays !== 0) {
            return customRetentionDays;
        }
        return LOGGING_DEFAULT_RETENTION_DAYS;
    }

    // ==================== Server-Specific Methods ====================

    request(req: Request, res: Response, timeMs: number, responseLength: number | string = "?"): void {
        for (const bl of requestBlacklist) {
            if (req.url.startsWith(bl)) {
                return;
            }
        }

        if (req.url.includes(".js.map") || req.url.includes(".css.map")) {
            return;
        }

        this.info(`${timeMs >= 10 ? "Slow " : ""}${res.statusCode} ${req.method} ${req.url} with ${responseLength} bytes took ${timeMs}ms`);
    }
}
