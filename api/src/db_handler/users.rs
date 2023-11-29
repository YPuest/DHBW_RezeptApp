use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, MySqlPool, query, query_as};

pub mod routes;

#[derive(Serialize, Deserialize, FromRow)]
pub struct UserEntry {
    name: String,
    salt: String,
    pass: String,
}

#[derive(Serialize, Deserialize)]
pub struct User {
    name: String,
    pass: String,
}

pub async fn create_user(pool: &MySqlPool, user: &User) -> Result<(), sqlx::Error> {
    let salt = SaltString::generate(&mut OsRng);
    let hashed_password = Argon2::default().hash_password(&user.pass.as_bytes(), &salt).unwrap().to_string();

    query("INSERT INTO users(name, salt, pass) VALUES(?, ?, ?);")
        .bind(&user.name)
        .bind(&salt.to_string())
        .bind(&hashed_password)
        .execute(pool)
        .await?;

    Ok(())
}

pub async fn update_user() {

}

pub async fn check_auth(pool: &MySqlPool, user: &User) -> Result<bool, anyhow::Error> {
    let user_entry = query_as::<_, UserEntry>("SELECT name,salt,pass from users WHERE name=?")
        .bind(&user.name)
        .fetch_one(pool)
        .await?;

    let pw_hash = PasswordHash::new(&user_entry.pass).unwrap();
    let result = Argon2::default().verify_password(&user.pass.as_bytes(), &pw_hash).is_ok();

    Ok(result)
}