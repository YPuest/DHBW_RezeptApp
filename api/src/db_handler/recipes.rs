use std::collections::{HashMap};
use std::hash::{Hash, Hasher};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, MySqlPool, query_as};
use sqlx::types::{JsonValue};

pub mod routes;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Recipe {
    name: String,
    description: JsonValue,
    img_url: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct RecipeEntry {
    name: String,
    description: JsonValue,
    img_url: String,
    importance: i8,
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

    let mut filter = format!("ingredients.name='{}'", &ingredients[0]);
    for i in 1..ingredients.len() {
        filter = format!("{filter} OR ingredients.name='{}'", &ingredients[i]);
    }

    let query = format!("SELECT recipes.name, recipes.description, recipes.img_url, importance FROM recipes \
        INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id \
        INNER JOIN ingredients \
        ON ingredients.id = recipe_ingredients.ingredient_id \
        WHERE {} ORDER BY recipes.importance", filter);

    let recipes = query_as::<_, RecipeEntry>(&query)
        .fetch_all(pool)
        .await?;

    let weighted_recipes = parse_recipes(&recipes);
    Ok(weighted_recipes)
}

fn parse_recipes(recipe_result: &Vec<RecipeEntry>) -> Vec<Recipe> {
    let mut recipes = HashMap::new();

    for result in recipe_result.iter() {
        if recipes.contains_key(&result.name) {
            *recipes.get_mut(&result.name).unwrap() += result.importance;

        } else {
            recipes.insert(&result.name, result.importance);
        }
    }

    let mut result = Vec::new();
    for recipe in recipes {
        if recipe.1 >= 50 {
            let recipe_res = recipe_result.iter().find(|&res| {res.name == *recipe.0}).unwrap();
            result.push(Recipe{
                name: recipe_res.name.clone(),
                description: recipe_res.description.clone(),
                img_url: recipe_res.img_url.clone(),
            })
        }
    }

    result
}