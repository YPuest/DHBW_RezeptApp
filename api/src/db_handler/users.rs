use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    name: String,
    password: String,
    salt: String,
}

impl User {
    pub async fn create_and_store() {

    }

    pub async fn update_and_store() {

    }

    pub async fn check_auth() {

    }

    pub async fn get() {

    }
}

pub mod routes;