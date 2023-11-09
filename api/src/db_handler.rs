use sqlx::{MySqlPool};

pub mod recipes;
pub mod users;

pub async fn get_connection_pool() -> Result<MySqlPool, anyhow::Error> {
    let uri = std::env::var("DB_URI").expect("DB_URI not set in .env file");
    let pool = MySqlPool::connect(&uri).await?;

    Ok(pool)
}