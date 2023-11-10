use axum::{Json, response::{IntoResponse, Response}, http::StatusCode, Router, routing::post, Extension};
use serde::Deserialize;
use sqlx::MySqlPool;
use crate::db_handler::recipes::get_recipes_from_ingredients;

#[derive(Deserialize)]
pub struct RecipeRequest {
    ingredients: Vec<String>
}

pub fn get_recipe_routes() -> Router {
    Router::new()
        .route("/get", post(handle_get_recipes))
}

pub async fn handle_get_recipes(Extension(pool): Extension<MySqlPool>, Json(ingredients): Json<RecipeRequest>) -> Response {
    let recipes = get_recipes_from_ingredients(&pool, "nudeln").await;

    match recipes {
        Ok(recipes) => {
            Json(recipes).into_response()
        },
        Err(e) => {
            println!("Error fetching recipes: {}", e.to_string());
            StatusCode::INTERNAL_SERVER_ERROR.into_response()
        }
    }
}