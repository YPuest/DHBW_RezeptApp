"use client";

import React, { useEffect, useState } from 'react';
import { useRecipeContext } from '@/components/Recipe-Provider';
import RecipePreview from '@/components/RecipePreview';
import { getCookie } from 'cookies-next'; // assuming you have cookies-next installed for cookie handling

export default function Favorites() {
    const { recipes, setRecipes } = useRecipeContext();
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const user = getCookie('user');
        const favorites = getCookie(user); // Fetch the favorite recipe names from the cookie
        if (favorites) {
            const favoriteNames = favorites.split(',');

            // Filter recipes to find those whose names are in the favoriteNames array
            const filteredRecipes = recipes.filter(recipe =>
                favoriteNames.includes(recipe.description.name)
            );

            setRecipes(filteredRecipes);
            console.log(recipes);

            // Create previews only for favorite recipes
            const favoriteRecipePreviews = filteredRecipes.map((recipe, index) => (
                <RecipePreview
                    key={index}
                    name={recipe.description.name}
                    ingredients={recipe.description.ingredients}
                    difficulty={recipe.description.difficulty}
                    time={recipe.description.time}
                    image={recipe.img_url}
                    index={index}
                />
            ));

            setFavoriteRecipes(favoriteRecipePreviews);
        } else {
            // No favorites found in cookies, set favoriteRecipes to empty array
            setFavoriteRecipes([]);
        }
    }, [1]);

    function handleBack() {
        window.history.back();
    }

    return (
        <div className="p-4">
            <button
                className="btn"
                style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                onClick={handleBack}
            >
                Zurück
            </button>
            <h2 className="text-2xl font-bold mb-4 pt-4">Favoriten</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes
                ) : (
                    <p>Keine Favoriten gefunden</p>
                )}
            </div>
        </div>
    );
}
