// 引入所需的库
use once_cell::sync::Lazy;
use std::net::UdpSocket;
use std::sync::Mutex;

use crate::utils::error::Error;

// 定义SingletonUdpClient结构体
pub struct SingletonUdpClient {
    // 使用Option和Mutex来实现线程安全的共享和修改UdpSocket
    socket: Mutex<UdpSocket>,
    // 使用Option和Mutex来实现线程安全的共享和修改s_key
    s_key: Mutex<Option<String>>,
}

impl SingletonUdpClient {
    // new方法用于创建一个新的SingletonUdpClient实例
    fn new() -> SingletonUdpClient {
        // 创建并绑定socket到本地地址
        let socket = UdpSocket::bind("0.0.0.0:6262").expect("Could not bind client socket");
        // 连接到服务器
        socket
            .connect("api.anidb.net:9000")
            .expect("Could not connect to server");

        SingletonUdpClient {
            socket: Mutex::new(socket),
            s_key: Mutex::new(None),
        }
    }

    // login方法用于向服务器发送登录消息并建立连接
    pub fn login(&self, username: &str, password: &str) -> Result<String, Error> {
        let socket = self.socket.lock().map_err(|e| Error::System(e.to_string()))?;
        let login_message = format!(
            "AUTH user={}&pass={}&protover=3&client=misakaudpapi&clientver=1&tag={}&enc=UTF-8",
            username, password, username
        );

        socket.send(login_message.as_bytes())?;

        let mut buf: [u8; 256] = [0; 256];
        let n = socket.recv(&mut buf)?;
        let res_str = std::str::from_utf8(&buf[..n])?;
        let res_vec: Vec<&str> = res_str.split(' ').collect();
        let res_opt = res_vec.get(2).cloned();
        let res = match res_opt {
            Some(v) if !v.is_empty() => v.to_string(),
            _ => return Err(Error::Business("invalid login response".into())),
        };

        let mut s_key = self.s_key.lock().map_err(|e| Error::System(e.to_string()))?;
        *s_key = Some(res);

        Ok(res_str.to_string())
    }

    // query方法用于向服务器发送查询
    pub fn query(&self, query: &str) -> Result<String, Error> {
        // 获取socket
        let socket = self.socket.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key_guard = self.s_key.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key = s_key_guard
            .as_ref()
            .ok_or_else(|| Error::Business("not authenticated".into()))?;

        let query_message = format!("ANIME aid={}&s={}", query, s_key);

        socket.send(query_message.as_bytes())?;
        let mut buf: [u8; 2048] = [0; 2048];
        let n = socket.recv(&mut buf)?;
        let res = std::str::from_utf8(&buf[..n])?;

        Ok(res.to_string())
    }

    // LOGOUT
    pub fn logout(&self) -> Result<String, Error> {
        // 获取socket
        let socket = self.socket.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key_guard = self.s_key.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key = s_key_guard
            .as_ref()
            .ok_or_else(|| Error::Business("not authenticated".into()))?;

        let logout_message = format!("LOGOUT s={}", s_key);

        socket.send(logout_message.as_bytes())?;
        let mut buf: [u8; 256] = [0; 256];
        let n = socket.recv(&mut buf)?;
        let res = std::str::from_utf8(&buf[..n])?;

        Ok(res.to_string())
    }

    // 更新的 UPDATED entity=1
    pub fn updated(&self) -> Result<String, Error> {
        // 获取socket
        let socket = self.socket.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key_guard = self.s_key.lock().map_err(|e| Error::System(e.to_string()))?;
        let s_key = s_key_guard
            .as_ref()
            .ok_or_else(|| Error::Business("not authenticated".into()))?;

        let updated_message = format!("RANDOMANIME type=0&s={}", s_key);

        socket.send(updated_message.as_bytes())?;
        let mut buf = vec![0u8; 2048];
        let n = socket.recv(&mut buf)?;
        let res = std::str::from_utf8(&buf[..n])?;

        println!("{}", res);

        Ok(res.to_string())
    }
}

// 使用Lazy创建一个只初始化一次的SingletonUdpClient实例
static SINGLETON_UDP_CLIENT: Lazy<SingletonUdpClient> = Lazy::new(SingletonUdpClient::new);

// 提供一个get_udp_client函数来获取这个实例
pub fn get_udp_client() -> &'static SingletonUdpClient {
    &SINGLETON_UDP_CLIENT
}
