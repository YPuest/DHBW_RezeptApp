use serde::{Deserialize, Serialize};

pub mod routes;

#[derive(Debug, Serialize, Deserialize)]
struct Recipe {
    name: String,
    description: String,
    ingredients: Vec<Ingredient>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Ingredient {
    name: String,
    amount: u16,
    unit: String,
}

#[derive(Deserialize)]
struct RecipeRequest {
    ingredients: Vec<String>
}