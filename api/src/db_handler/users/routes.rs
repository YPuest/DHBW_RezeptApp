use axum::{Json, response::{IntoResponse, Response}, http::StatusCode, Router, routing::post};

use super::User;

pub fn get_user_routes() -> Router {
    Router::new()
        .route("/create", post(handle_create_user))
}

pub async fn handle_create_user(Json(user): Json<User>) -> Response {
    (StatusCode::OK).into_response()
}