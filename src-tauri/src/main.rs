#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod ani;
mod config;

use std::cell::OnceCell;
use std::net::UdpSocket;
use std::str;

pub struct Ani {
    pub socket:UdpSocket,
    pub s_key:String
}

static ANI:OnceCell<Ani> = OnceCell::new();
// UdpSocket::bind("0.0.0.0:6262").expect("couldn't bind to address");

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn greet(name: &str) -> Result<String, ()> {
    // ANI.loginConnectAniDb(String::from("1"), String::from("a"))
    // .await;
    let a = ".....";
    Ok(a.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
