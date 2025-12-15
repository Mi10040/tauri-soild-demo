use crate::ani::connect;

#[tauri::command]
pub async fn login(username: &str, password: &str) -> Result<String, String> {
    let udp_client = connect::get_udp_client();
    udp_client
        .login(username, password)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn query(name: &str) -> Result<String, String> {
    let udp_client = connect::get_udp_client();
    udp_client.query(name).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn logout() -> Result<String, String> {
    let udp_client = connect::get_udp_client();
    udp_client.logout().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn updated() -> Result<String, String> {
    let udp_client = connect::get_udp_client();
    udp_client.updated().map_err(|e| e.to_string())
}
