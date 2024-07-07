'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";
import RecipePreview from "@/components/RecipePreview";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showErrorBanner, setShowErrorBanner] = useState(false);

    const { recipes, setRecipes } = useRecipeContext();
    const ingredients = [
        "hackfleisch", "tomatensauce", "zwiebel", "knoblauch",
        "pesto", "olivenoel", "peperoncino", "petersilie",
        "lasagneblaetter", "spinat", "ricotta", "mozzarella", "haehnchenbrust", "kokosmilch",
        "currypaste", "gemuese", "reis", "lachsfilet", "zitrone", "dill", "kartoffeln",
        "rindfleisch_ravioli", "paprika", "zucchini", "marinade", "tomaten", "frisches_basilikum",
        "gemischtes_gemuese", "basmatireis", "blaetterteig", "feta", "milch", "quinoa",
        "gebratenes_gemuese", "avocado", "hummus", "rote_linsen", "gewuerze", "vollkornnudeln",
        "basilikum", "karotten", "kirschtomaten", "mandeln", "balsamico", "aubergine", "couscous",
        "gurke", "camembert", "paniermehl", "preiselbeersauce", "cherrytomaten", "kichererbsen",
        "suesskartoffel", "vollkornbrot", "kresse", "linsen", "gemuesebruehe", "sellerie",
        "paella_reis", "erbsen"
    ];

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const response = await fetch('http://142.132.226.214:3010/recipes/get', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "ingredients": ingredients }),
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
        const searchIngredients = inputs.split(",");

        const responseSearch = await fetch('http://142.132.226.214:3010/recipes/get', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "ingredients": searchIngredients }),
        });

        const dataSearch = await responseSearch.json();

        const filteredRecipes = dataSearch.filter(recipe =>
            searchIngredients.every(ingredient =>
                recipe.description.ingredients.map(ing => ing.toLowerCase()).includes(ingredient)
            )
        );

        if (filteredRecipes.length > 0) {
            setRecipes(filteredRecipes);
            setSearchResults(filteredRecipes.map((recipe, i) => (
                <RecipePreview
                    name={recipe.description.name}
                    ingredients={recipe.description.ingredients}
                    difficulty={recipe.description.difficulty}
                    time={recipe.description.time}
                    image={recipe.img_url}
                    index={i}
                    key={i + ""}
                />
            )));
        } else {
            setSearchResults([]);
            setShowErrorBanner(true);
            setTimeout(() => {
                setShowErrorBanner(false);
            }, 2000);
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            {loading ? (
                <div style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}></div>
            ) : (
                <div className="p-4">
                    {showErrorBanner && (
                        <div className="bg-red-500 text-white px-4 py-5 fixed top-0 left-0 right-0 z-50 text-center">
                            Keine Rezepte gefunden!
                        </div>
                    )}
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
