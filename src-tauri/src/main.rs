#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod ani;
mod config;
mod utils;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    utils::ini::load_config();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            ani::ipc::login,
            ani::ipc::query,
            ani::ipc::logout,
            ani::ipc::updated
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
