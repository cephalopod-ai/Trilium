/**
 * Sync process can make data intermittently inconsistent. Processes which require strong data consistency
 * (like consistency checks) can use this mutex to make sure sync isn't currently running.
 * Exclusion is in-process only. SQLite supplies cross-process writer locking; hosts must not
 * share one writable document through independently cached core instances.
 */

import { Mutex } from "async-mutex";
const instance = new Mutex();

async function doExclusively<T>(func: () => T) {
    const releaseMutex = await instance.acquire();

    try {
        return await func();
    } finally {
        releaseMutex();
    }
}

export default {
    doExclusively
};
