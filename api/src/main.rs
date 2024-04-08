use axum::{Extension, Router, ServiceExt};
use tower::ServiceBuilder;
use crate::db_handler::get_connection_pool;

mod db_handler;

use crate::db_handler::recipes::routes::get_recipe_routes;
use crate::db_handler::users::routes::get_user_routes;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().expect("Failed to load .env");
    let mysql_pool = get_connection_pool().await.expect("Cannot connect to Mysql");

    let app = Router::new()
        .nest("/recipes", get_recipe_routes())
        .nest("/users", get_user_routes())
        .layer(ServiceBuilder::new()
            .layer(CorsLayer::permissive())
            .layer(Extension(mysql_pool))
        );

    axum::Server::bind(&"0.0.0.0:3010".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();

    println!("Server running @localhost:3010");
}
