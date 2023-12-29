use std::{convert::From, str::Utf8Error};

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("{0}")]
    Database(String),
    #[error("{0}")]
    Business(String),
    #[error("{0}")]
    System(String),
}

impl From<std::io::Error> for Error {
    fn from(err: std::io::Error) -> Self {
        Error::System(err.to_string())
    }
}

impl From<Utf8Error> for Error {
    fn from(err: Utf8Error) -> Self {
        Error::System(err.to_string())
    }
}
