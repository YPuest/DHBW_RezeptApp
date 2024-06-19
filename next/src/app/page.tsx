"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";
import RecipePreview from "@/components/RecipePreview";
import Navbar from "@/components/Navbar";

export default function Home() {
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);

    const { recipes, setRecipes } = useRecipeContext();

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const response = await fetch('http://142.132.226.214:3010/recipes/get', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "ingredients": ["hackfleisch", "nudeln", "reis", "käse", "tomate", "tomaten"] }),
            });

            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        };

        fetchRecipes();
    }, [setRecipes]);

    const previews = useMemo(() => {
        let suggestions = [];
        let recommended = [];
        let popular = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipePreview = (
                <RecipePreview
                    name={recipes[i].description.name}
                    ingredients={recipes[i].description.ingredients}
                    difficulty={recipes[i].description.difficulty}
                    time={recipes[i].description.time}
                    image={recipes[i].img_url}
                    index={i}
                    key={i + ""}
                />
            );

            if (i % 3 === 0) {
                suggestions.push(recipePreview);
            } else if (i % 3 === 1) {
                recommended.push(recipePreview);
            } else {
                popular.push(recipePreview);
            }
        }

        return {
            suggestions: suggestions.slice(0, 4),
            recommended: recommended.slice(0, 4),
            popular: popular.slice(0, 4)
        };
    }, [recipes]);

    useEffect(() => {
        setIsSearching(searchResults.length > 0);
    }, [searchResults]);

    const handleSearch = async (query) => {
        setLoading(true);
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
        setLoading(false);

        if (data.length > 0) {
            console.log("Recipes found!")
        } else {
            console.log("No Recipe with that RecipeIngredients!")
        }
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            {loading ? (
                <div style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}></div>
            ) : (
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
                            <h2 className="text-2xl font-bold mb-4">Könnte dir gefallen</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {previews.popular}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
