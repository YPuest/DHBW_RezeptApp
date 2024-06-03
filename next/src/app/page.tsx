"use client";

import React, { useState, useEffect } from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";
import RecipePreview from "@/components/RecipePreview";
import Navbar from "@/components/Navbar";

export default function Home() {
    const [previews, setPreviews] = useState({
        suggestions: [],
        recommended: [],
        popular: []
    });
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const recipes = useRecipeContext();

    useEffect(() => {
        let suggestions = [];
        let recommended = [];
        let popular = [];

        // Assuming recipes.recipes is an array of recipe objects
        for (let i = 0; i < recipes.recipes.length; i++) {
            const recipePreview = (
                <RecipePreview
                    name={recipes.recipes[i].name}
                    ingredients={recipes.recipes[i].ingredients}
                    difficulty={recipes.recipes[i].difficulty}
                    time={recipes.recipes[i].time}
                    image={recipes.recipes[i].image}
                    index={i}
                    key={i + ""}
                />
            );

            // Simple categorization logic (you can replace this with your own logic)
            if (i % 3 === 0) {
                suggestions.push(recipePreview);
            } else if (i % 3 === 1) {
                recommended.push(recipePreview);
            } else {
                popular.push(recipePreview);
            }
        }

        setPreviews({
            suggestions: suggestions.slice(0, 3), // Display the first 3 in each category
            recommended: recommended.slice(0, 3),
            popular: popular.slice(0, 3)
        });
    }, [recipes]);

    useEffect(() => {
        // Check if there are search results to determine if searching
        setIsSearching(searchResults.length > 0);
    }, [searchResults]);

    const handleSearch = async (query) => {
        // Create array of ingredients
        let inputs = query.toLowerCase();
        inputs = inputs.replaceAll(" ", "");
        const ingredients = inputs.split(",");
        console.log(JSON.stringify({"ingredients": ingredients}));

        const response = await fetch('http://142.132.226.214:3010/recipes/get', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"ingredients": ingredients}),
        });

        const data = await response.json();
        console.log(data);

        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(
                <RecipePreview
                    name={data[i].description.name}
                    ingredients={data[i].description.ingredients}
                    difficulty={data[i].description.difficulty}
                    time={data[i].description.time}
                    image={data[i].img_url}
                    index={i}
                    key={i + ""}
                />
            );
        }

        setSearchResults(temp);

        if (data.length > 0) {
            console.log("Recipes found!")
        } else {
            console.log("No Recipe with that RecipeIngredients!") //todo error modal
        }
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            <div className="p-4">
                {isSearching ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults}
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Unsere Vorschläge</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                            {previews.suggestions}
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Von unserem Koch empfohlen</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                            {previews.recommended}
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Beliebt</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                            {previews.popular}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}