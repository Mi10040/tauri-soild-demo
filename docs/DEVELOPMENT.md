# Development notes

Key dev/build constraints for this repo:

- Vite dev server must run on port 1420. See [vite.config.ts](vite.config.ts) (`server.port = 1420`, `strictPort = true`).
- Tauri expects the dev frontend at `http://localhost:1420` (see [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json) `devPath`).
- `tauri.conf.json` uses `beforeDevCommand`/`beforeBuildCommand` set to `yarn` commands; prefer `yarn` for dev and CI unless you update the config.

Common commands:

```bash
yarn
yarn dev      # run Vite dev server
yarn tauri dev # starts the desktop app (requires Vite running on :1420)
yarn build     # build frontend
yarn tauri build # bundle native app

# Lint & format (after adding deps)
yarn lint
yarn format
```

If `yarn tauri dev` fails, check the Vite server is running on port 1420 and the port is free.
