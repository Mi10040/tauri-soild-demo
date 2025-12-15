# Copilot / AI Agent Instructions

Purpose: make AI coding agents immediately productive in this Tauri + Solid + TypeScript workspace.

Quick architecture
- Frontend (renderer): Solid + Vite in `src/`. Primary entry points: `src/index.tsx`, `src/App.tsx`.
- Backend (native): Rust + Tauri in `src-tauri/src/`. App entry is `src-tauri/src/main.rs` which registers IPC commands.
- Communication: Tauri IPC — frontend calls `invoke(...)` from `@tauri-apps/api`, backend exposes functions with `#[tauri::command]` and registers them via `tauri::generate_handler!`.

Essential files to inspect
- Frontend entry and pages: [src/index.tsx](src/index.tsx), [src/App.tsx](src/App.tsx), [src/page/ani/index.tsx](src/page/ani/index.tsx) (shows `invoke` usage).
- Vite config and port: [vite.config.ts](vite.config.ts) (server.port = 1420, strictPort = true).
- Tauri config: [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json) (devPath, beforeDevCommand, bundle settings).
- Tauri/native entry: [src-tauri/src/main.rs](src-tauri/src/main.rs) (registers handlers).
- Example backend command impl: [src-tauri/src/ani/ipc.rs](src-tauri/src/ani/ipc.rs).

Build / dev workflows (exact commands)
- Install deps: `yarn` (or `npm install`).
- Frontend dev (Vite): `yarn dev` or `npm run dev`.
- Desktop dev (launch Tauri + frontend): `yarn tauri dev` (tauri.conf.json expects the dev server at http://localhost:1420).
- Build frontend: `yarn build`.
- Bundle native app: `yarn tauri build` (invokes the `beforeBuildCommand` defined in `tauri.conf.json`).

Notes and gotchas (project-specific)
- Vite port is fixed to `1420` (see `vite.config.ts`). `tauri.conf.json`'s `devPath` uses the same host:port; `strictPort: true` means `yarn tauri dev` will fail if that port is occupied.
- `tauri.conf.json`'s `beforeDevCommand` and `beforeBuildCommand` use `yarn` by default — prefer `yarn` in CI/dev to match the config or adapt the conf if using `npm`.
- Frontend -> backend mapping: names passed to `invoke()` must match the command names exposed in `tauri::generate_handler!` and the `#[tauri::command]` functions (see `src-tauri/src/main.rs` and `src-tauri/src/ani/ipc.rs`).
- Environment flags: `TAURI_DEBUG` is read by `vite.config.ts` to toggle minification and sourcemaps.

Common patterns and conventions
- IPC: Put command implementations under a module (e.g., `src-tauri/src/ani/*`) with `#[tauri::command]` and add them to the handler list in `main.rs`.
- Frontend: use Solid signals and components; pages live under `src/page/` (see `src/page/ani/index.tsx`).
- Styles: `.less` modules used alongside components (see `src/components/**` and `viteTest.module.less`).
- Code splitting: `vite.config.ts` includes a `manualChunks` heuristic that splits by `module/` path segments if present.

When you change IPC
- Add `#[tauri::command]` function in an appropriate Rust module (e.g., `src-tauri/src/ani/ipc.rs`).
- Register it in `tauri::generate_handler![ ... ]` in `src-tauri/src/main.rs`.
- Call it from frontend via `import { invoke } from "@tauri-apps/api"; await invoke("command_name", { /* args */ })` (see `src/page/ani/index.tsx`).

Where to look first for new tasks
- UI changes: `src/` (pages, components, style files).
- New backend features / native integration: `src-tauri/src/` (follow module layout: `ani`, `jikan`, `config`, `utils`).
- Build and packaging: `tauri.conf.json`, `vite.config.ts`, and `package.json` scripts.

If something breaks
- Confirm the Vite dev server is running on port 1420 before `yarn tauri dev`.
- Check the Tauri CLI and Rust toolchain: `rustc --version`, `cargo --version`, and `yarn tauri --version`.

Want changes to this guide?
Leave short notes/PRs; I will merge project-specific examples or CI snippets you want included.
