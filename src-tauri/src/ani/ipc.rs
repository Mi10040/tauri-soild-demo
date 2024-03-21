use crate::ani::connect;

#[tauri::command]
pub async fn login(username: &str, password: &str) -> Result<String, ()> {
    let udp_client = connect::get_udp_client();
    let res = udp_client
        .login(username, password)
        .unwrap_or("error".to_string());
    Ok(res)
}

#[tauri::command]
pub async fn query(name: &str) -> Result<String, ()> {
    let udp_client = connect::get_udp_client();
    let res = udp_client.query(name).unwrap_or("error".to_string());
    Ok(res)
}

#[tauri::command]
pub async fn logout() -> Result<String, ()> {
    let udp_client = connect::get_udp_client();
    let res = udp_client.logout().unwrap_or("error".to_string());
    Ok(res)
}

#[tauri::command]
pub async fn updated() -> Result<String, ()> {
    let udp_client = connect::get_udp_client();
    let res = udp_client.updated().unwrap_or("error".to_string());
    Ok(res)
}
