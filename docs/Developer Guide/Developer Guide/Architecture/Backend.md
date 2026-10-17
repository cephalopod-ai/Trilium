# Backend
The backend consists of portable domain code in `packages/trilium-core` and runtime-specific adapters in the host applications.

## Startup and providers

The server entry point is `apps/server/src/main.ts`. `apps/server/src/core_init.ts` supplies providers to `initializeCore()`: execution context, database, crypto, archives, requests, translations, messaging, images, backups and platform capabilities. Database initialization can continue asynchronously; database consumers wait for `sql_init.dbReady`, and cache consumers wait for `becca_loader.beccaLoaded`.

Standalone supplies browser implementations from `apps/standalone/src/local-server-worker.ts` and `apps/standalone/src/lightweight`. Desktop uses the Node server with Electron integrations; mobile wraps standalone in Capacitor.

## Domain services

Paths below are relative to `packages/trilium-core/src`:

| Surface | Implementation |
| --- | --- |
| Cached entities and lifecycle | `becca/entities/` and `becca/becca_loader.ts` |
| Note CRUD, content, revisions and undelete | `services/notes.ts` and the entity methods |
| Branch movement and tree consistency | `services/branches.ts`, `services/tree.ts`, `services/consistency_checks.ts` |
| Search | `services/search/services/search.ts` and `services/search/expressions/` |
| Synchronization and conflict application | `services/sync.ts`, `services/sync_update.ts`, `services/sync_mutex.ts` |
| Backend scripting | `services/backend_script_api.ts`, `services/script_context.ts`, `services/script.ts` |
| Import and export | `services/import/` and `services/export/` |
| Encryption and protected sessions | `services/encryption/` and `services/protected_session.ts` |
| SQL provider contract and transactions | `services/sql/` |
| Fresh schema and upgrades | `assets/schema.sql` and `migrations/migrations.ts` |

Becca entities own their tables and create entity changes for synchronized mutations. Reordering and expansion use entity-owned methods with specialized local-state semantics. Sync ingestion, erase and migrations are explicit persistence infrastructure, not a model for route-level SQL writes.

## Routes and transport

Shared handlers live in `packages/trilium-core/src/routes/api/`; `packages/trilium-core/src/routes/index.ts` registers them through a transport-neutral interface. `apps/server/src/routes/route_api.ts` supplies Express authentication, CSRF, execution-context and transaction wrapping. `apps/standalone/src/lightweight/browser_routes.ts` supplies the worker adapter.

Server-only routes and middleware remain under `apps/server/src/routes/`, including `routes.ts` for registration, `auth.ts` and `csrf.ts`. The external API is implemented separately under `apps/server/src/etapi/`. Public sharing is hosted by `apps/server/src/share/`.

A core handler receives the request/response shapes in `packages/trilium-core/src/http_interface.ts`. It retrieves entities through Becca, calls domain services, and returns a result or an HTTP error. Transport adapters serialize the result. WebSocket contracts are owned by `packages/commons/src/lib/ws_api.ts`.

## Transaction boundaries

Synchronous mutations use the SQL transaction wrapper. Notifications registered with `afterCommit()` are delivered only after the outer commit and discarded on rollback. Async work must not leave a shared database connection inside a transaction while unrelated requests can enter it. ZIP imports therefore use synchronous batches and compensate newly created records on failure; overwrite/restore imports still require a durable journal for complete rollback.

A host rollback hook reloads Becca and recalculates the maximum entity-change ID. The standalone hook uses `becca_loader.recoverTransactionRollback()`; provider implementations and regression tests must keep this lifecycle consistent.