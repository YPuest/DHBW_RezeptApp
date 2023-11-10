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

pub async fn get_recipes_from_ingredients(pool: &MySqlPool, mut ingredients: Vec<String>) -> Result<Vec<Recipe>, anyhow::Error> {
    for ingredient in ingredients.iter_mut() {
        *ingredient = ingredient.to_lowercase();
    }

    let mut filter = format!("'{}'", &ingredients[0]);
    for i in 1..ingredients.len() - 1 {
        filter = format!("{filter} OR ingredients.name= '{}' OR ingredients.name=", &ingredients[i]);
    }

    match ingredients.len() {
        1 => filter = filter,
        2 => filter = format!("{filter} OR ingredients.name= '{}'", &ingredients[ingredients.len() - 1]),
        _ => filter = format!("{filter} '{}'", &ingredients[ingredients.len() - 1]),
    }

    let query = format!("SELECT DISTINCT recipes.name, recipes.description FROM recipes \
        INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id \
        INNER JOIN ingredients \
        ON ingredients.id = recipe_ingredients.ingredient_id \
        WHERE ingredients.name={}", filter);

    let recipes = query_as::<_, Recipe>(&query)
        .fetch_all(pool)
        .await?;

    Ok(recipes)
}