use axum::{Router, routing::{post}, ServiceExt};

mod db_handler;

use crate::db_handler::recipes::routes::get_recipe_routes;
use crate::db_handler::users::routes::get_user_routes;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .nest("/recipes", get_recipe_routes())
        .nest("/users", get_user_routes());

    axum::Server::bind(&"0.0.0.0:3010".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
