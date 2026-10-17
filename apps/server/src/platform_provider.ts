import { getLog, PlatformProvider } from "@triliumnext/core";
import { createRequire } from "module";
import path from "path";

import dataDir from "./services/data_dir.js";

export default class ServerPlatformProvider implements PlatformProvider {
    readonly isElectron = !!process.versions["electron"];
    readonly isStandalone = false;
    readonly isMac = process.platform === "darwin";
    readonly isWindows = process.platform === "win32";
    readonly isLinux = process.platform === "linux";

    crash(message: string): void {
        getLog().banner(message);
        process.exit(1);
    }

    requireScriptModule(name: string): unknown {
        return createRequire(import.meta.url)(name);
    }

    getEnv(key: string): string | undefined {
        return process.env[key];
    }

    getDatabasePath(): string {
        return path.resolve(dataDir.DOCUMENT_PATH);
    }
}
