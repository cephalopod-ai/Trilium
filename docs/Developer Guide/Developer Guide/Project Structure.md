# Project Structure
Trilium uses pnpm workspaces, with runnable applications under `apps/*` and shared libraries under `packages/*`. `pnpm-workspace.yaml` defines those workspace roots.

## Applications

| Directory | Purpose |
| --- | --- |
| `apps/client` | Shared frontend for server, desktop, standalone and mobile. |
| `apps/server` | Node.js host, Express transport, ETAPI and platform providers. |
| `apps/desktop` | Electron host and native integrations. |
| `apps/standalone` | Browser worker host, SQLite WASM and OPFS storage. |
| `apps/mobile` | Capacitor shell around standalone. |
| `apps/web-clipper` | Firefox and Chromium browser extension. |
| `apps/website` | Public website. |
| `apps/db-compare` | Database comparison tool. |
| `apps/dump-db` | Database export tool. |
| `apps/edit-docs` | Documentation editor and synchronization tools. |
| `apps/build-docs` | Documentation build tooling. |
| `apps/icon-pack-builder` | Icon font generation. |
| `apps/script-deployer` | Script deployment tooling. |

## Packages

| Directory | Purpose |
| --- | --- |
| `packages/trilium-core` | Portable backend entities, services, SQL abstractions, sync, migrations and shared routes. |
| `packages/commons` | Types and utilities shared with the frontend and hosts. |
| `packages/trilium-e2e` | Shared Playwright end-to-end tests. |
| `packages/trilium-backup-container` | Compressed and encrypted backup format. |
| `packages/ckeditor5` | Rich text editor and in-tree plugins. |
| `packages/codemirror` | Code editor integration. |
| `packages/highlightjs` | Syntax highlighting. |
| `packages/pdfjs-viewer` | PDF viewer integration. |
| `packages/share-theme` | Shared-note rendering theme. |
| `packages/splitjs` | Split-pane support. |
| `packages/turndown-plugin-gfm` | Markdown conversion support. |

The Docker build context under `apps/server/docker` has a packaging manifest; it is not a separate top-level workspace application.

## Development commands

```sh
pnpm server:start
pnpm standalone:start
pnpm desktop:start
pnpm --filter server test <spec-path>
pnpm --filter standalone test <core-spec-path>
pnpm typecheck
```

Core specifications run through both server and standalone providers. See [Architecture](Architecture.md) for runtime boundaries and [Backend](Architecture/Backend.md) for service ownership.