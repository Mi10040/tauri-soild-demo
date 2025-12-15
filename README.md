# Tauri + Solid + Typescript

This template should help get you started developing with Tauri, Solid and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 无边界 ?

- 边框? 
- 多窗体?
- 内容空间感强调
- 空旷感 ?

## 项目说明（中文）

这是一个基于 Tauri + Solid + TypeScript 的桌面应用模板。前端使用 Solid + Vite 构建，后端使用 Rust(Tauri) 提供本地能力和 IPC（通过 `@tauri-apps/api` 的 `invoke` 调用）。

快速启动：

```bash
yarn
yarn tauri dev   # 启动前端构建并运行桌面应用（无需单独启动 Vite）
```

项目要点：
- 前端入口：`src/index.tsx`、`src/App.tsx`，页面位于 `src/page/`。
- 后端入口：`src-tauri/src/main.rs`，Tauri 命令实现位于 `src-tauri/src/*` 模块下（例如 `src-tauri/src/ani/ipc.rs`）。
- 注意：默认 Tauri dev 配置使用已构建的 `dist`，便于直接运行桌面应用；如果你需要 Vite 的 HMR，请修改 `src-tauri/tauri.conf.json` 中的 `beforeDevCommand`/`devPath` 设置。
