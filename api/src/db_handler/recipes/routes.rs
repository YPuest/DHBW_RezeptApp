use axum::{Json, response::{IntoResponse, Response}, http::StatusCode, Router, routing::post};

use super::RecipeRequest;

pub fn get_recipe_routes() -> Router {
    Router::new()
        .route("/get", post(handle_get_recipes))
}

pub async fn handle_get_recipes(Json(ingredients): Json<RecipeRequest>) -> Response {
    (StatusCode::OK).into_response()
}