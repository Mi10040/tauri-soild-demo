use ini::Error;
use ini::Ini;
use std::path::Path;
use tauri::api::path;

use crate::config::system;

fn file_exists(file_path: &str) -> bool {
    Path::new(file_path).exists()
}

fn load_ini(file_path: &str) -> Result<Ini, Error> {
    Ini::load_from_file(file_path)
}

pub fn load_config() {
    match path::config_dir() {
        Some(pathBuf) => match pathBuf.to_str() {
            Some(pt) => {
                let path = format!("{}{}{}", pt, system::SYSTEM_CONFIG_PATH, "config.ini");
                if file_exists(&path) {
                    println!("ok")
                } else {
                    let mut conf = Ini::new();
                    conf.with_section(Some("User"))
                        .set("name", "Raspberry树莓")
                        .set("value", "Pi");
                    conf.with_section(Some("Library"))
                        .set("name", "Sun Yat-sen U")
                        .set("location", "Guangzhou=world");
                    conf.write_to_file(path).unwrap();
                }
            }
            None => {}
        },
        None => {}
    }
}

pub fn load_data() {
    match path::data_dir() {
        Some(pathBuf) => match pathBuf.to_str() {
            Some(pt) => {
                let path = format!("{}{}{}", pt, system::SYSTEM_CONFIG_PATH, "data.ini");
                if file_exists(&path) {
                    println!("ok")
                } else {
                    let mut conf = Ini::new();
                    conf.with_section(Some("User"))
                        .set("name", "Raspberry树莓")
                        .set("value", "Pi");
                    conf.with_section(Some("Library"))
                        .set("name", "Sun Yat-sen U")
                        .set("location", "Guangzhou=world");
                    conf.write_to_file(path).unwrap();
                }
            }
            None => {}
        },
        None => {}
    }
}
