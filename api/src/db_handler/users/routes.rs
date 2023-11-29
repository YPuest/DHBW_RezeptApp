use axum::{Json, response::{IntoResponse, Response}, http::StatusCode, Router, routing::post, Extension};
use sqlx::MySqlPool;

use super::{check_auth, create_user, User};

pub fn get_user_routes() -> Router {
    Router::new()
        .route("/create", post(handle_create_user))
        .route("/auth", post(handle_check_auth))
}

pub async fn handle_create_user(Extension(pool): Extension<MySqlPool>, Json(user): Json<User>) -> Response {
    match create_user(&pool, &user).await {
        Ok(()) => (StatusCode::OK).into_response(),
        Err(e) => {
            println!("Error creating user: {}", e.to_string());
            StatusCode::INTERNAL_SERVER_ERROR.into_response()
        }
    }
}

pub async fn handle_check_auth(Extension(pool): Extension<MySqlPool>, Json(user): Json<User>) -> Response {
    match check_auth(&pool, &user).await {
        Ok(auth_check) => match auth_check {
            true => StatusCode::OK.into_response(),
            false => StatusCode::UNAUTHORIZED.into_response()
        },
        Err(e) => {
            println!("Error checking user auth: {}", e.to_string());
            StatusCode::INTERNAL_SERVER_ERROR.into_response()
        }
    }
}