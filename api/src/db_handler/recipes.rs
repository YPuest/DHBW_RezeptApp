use serde::{Deserialize, Serialize};
use sqlx::{FromRow, MySqlPool, query_as};

pub mod routes;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Recipe {
    name: String,
    description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient {
    name: String,
    amount: u16,
    unit: String,
}

pub async fn get_recipes_from_ingredients(pool: &MySqlPool, ingredients: &str) -> Result<Vec<Recipe>, anyhow::Error> {
    let recipes = query_as::<_, Recipe>(
        "SELECT recipes.name, recipes.description FROM recipes \
        INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id \
        INNER JOIN ingredients \
        ON ingredients.id = recipe_ingredients.ingredient_id \
        WHERE ingredients.name= ? ")
        .bind("nudeln")
        .fetch_all(pool)
        .await?;

    Ok(recipes)
}