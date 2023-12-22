use std::net::UdpSocket;

#[derive(Debug)]
struct AniConnect {
    user: String,
    pass: String,
    socket: UdpSocket,
}

impl AniConnect {
    pub async fn loginConnectAniDb(&self) {
        let login = format!(
            "AUTH user={}&pass={}&protover=3&client=misakaudpapi&clientver=1&tag={}&enc=UTF-8",
            self.user, self.pass, self.user
        );
        self.socket.connect("api.anidb.net:9000").expect("1");
        self.socket
            .send(login.as_bytes())
            .expect("couldn't send message");

        let mut buf: [u8; 2048] = [0; 2048];
        match self.socket.recv(&mut buf) {
            Ok(received) => {
                let s = std::str::from_utf8(&buf);
                match s {
                    Ok(v) => {
                        println!("Got a valid UTF-8 sequence: {}", v);
                        let vs: Vec<&str> = v.split(" ").collect();
                        if let Some(vsa) = vs.get(2) {
                            skey = vsa
                        }
                    }
                    Err(e) => println!("This is not valid UTF-8. {}", e),
                };
            }
            Err(e) => println!("recv function failed: {e:?}"),
        }
    }
}

// match socket.recv(&mut buf) {
//     Ok(received) => {
//         let s = std::str::from_utf8(&buf);
//         match s {
//             Ok(v) => {
//                 println!("Got a valid UTF-8 sequence: {}", v);
//                 let vs: Vec<&str> = v.split(" ").collect();
//                 if let Some(vsa) = vs.get(2) {
//                     skey = vsa
//                 }
//             }
//             Err(e) => println!("This is not valid UTF-8. {}", e),
//         };
//     }
//     Err(e) => println!("recv function failed: {e:?}"),
// }

// async fn anit() {
//     println!("ani start");
//     let socket = UdpSocket::bind("0.0.0.0:6262").expect("couldn't bind to address");

//     let login =
//         "AUTH user=Misaka10040&pass=Kk18244257586&protover=3&client=misakaudpapi&clientver=1&tag=Misaka10040&enc=UTF-8";
//     println!("1");
//     socket.connect("api.anidb.net:9000").expect("1");
//     socket
//         .send(login.as_bytes())
//         .expect("couldn't send message");

//     println!("2");
//     let mut buf: [u8; 2048] = [0; 2048];

//     println!("3");
//     let mut skey = "";
//     match socket.recv(&mut buf) {
//         Ok(received) => {
//             let s = std::str::from_utf8(&buf);
//             match s {
//                 Ok(v) => {
//                     println!("Got a valid UTF-8 sequence: {}", v);
//                     let vs: Vec<&str> = v.split(" ").collect();
//                     if let Some(vsa) = vs.get(2) {
//                         skey = vsa
//                     }
//                 }
//                 Err(e) => println!("This is not valid UTF-8. {}", e),
//             };
//         }
//         Err(e) => println!("recv function failed: {e:?}"),
//     }
//     println!("4");
//     let ainDbQuset = "ANIME aid=11802&s=".to_string() + skey;
//     socket
//         .send(ainDbQuset.as_bytes())
//         .expect("couldn't send message");

//     match socket.recv(&mut buf) {
//         Ok(received) => {
//             println!("received {received} bytes {:?}", &buf[..received]);
//             let s = std::str::from_utf8(&buf);
//             match s {
//                 Ok(v) => println!("Got a valid UTF-8 sequence: {}", v),
//                 Err(e) => println!("This is not valid UTF-8. {}", e),
//             };
//         }
//         Err(e) => println!("recv function failed: {e:?}"),
//     }
// }
