use std::net::UdpSocket;

use crate::config::error::Error;

pub async fn quest_ani(s_key: String, socket: UdpSocket) -> Result<String, Error> {
    if s_key == "not" {
        return Err(Error::Database(String::from("not s_key in login")));
    }
    let ain_db_quest = "ANIME aname=11802&s=".to_string() + &s_key;
    socket
        .send(ain_db_quest.as_bytes())
        .expect("couldn't send message");

    let mut buf: [u8; 2048] = [0; 2048];

    socket.recv(&mut buf)?;
    let res = std::str::from_utf8(&buf)?;
    Ok(format!("{}", res))
}
