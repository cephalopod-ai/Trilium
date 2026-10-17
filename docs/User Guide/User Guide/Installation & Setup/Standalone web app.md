# Standalone web app
The standalone web app runs Trilium and its database inside the browser. Its local database belongs to that browser profile.

## Offline use

Open the app online first and allow startup to finish. Production builds cache the entry page and static files as they are used. Previously loaded files can then be served when the network is unavailable. Features whose files have not yet been loaded, synchronization, and external services can still require a connection. Development builds bypass this cache.

Keep regular backups. Cached application files do not replace a backup of the local database.

## Worker failures

A fatal database-worker failure displays an error overlay. Pending restores and backup operations fail instead of waiting indefinitely. Reload the app before trying again, and inspect the database state before repeating a restore.