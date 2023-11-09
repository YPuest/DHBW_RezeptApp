use serde::{Deserialize, Serialize};

pub mod routes;

#[derive(Debug, Serialize, Deserialize)]
pub struct Recipe {
    name: String,
    description: String,
    ingredients: Vec<Ingredient>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient {
    name: String,
    amount: u16,
    unit: String,
}

#[derive(Deserialize)]
pub struct RecipeRequest {
    ingredients: Vec<String>
}