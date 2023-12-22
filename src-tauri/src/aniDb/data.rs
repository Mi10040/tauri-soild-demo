use std::net::UdpSocket;

#[derive(Debug)]
struct Data {
    aid: String,
    // aname: String,
    socket: UdpSocket,
}

impl Data {
    pub async fn retrieveAnimeData(&self) {
        // self.socket
    }
}
