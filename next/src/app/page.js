"use client";

import Preview from "@/components/RecipePreview";
import React, { useState, useEffect } from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";
import Sign from "@/components/Sign";
import RecipePreview from "@/components/RecipePreview";

export default function Home() {
    const food_categories = ["nudeln", "kartoffeln", "fisch", "hackfleisch", "knoblauch", "eier", "milch", "tomaten"];
    const [previews, setPreviews] = useState([]);

    const recipes = useRecipeContext()
    useEffect(() => {
        let temp = [];
        for (let i = 0; i < recipes.recipes.length; i++) {
            temp.push(
                <RecipePreview
                    name={recipes.recipes[i].name}
                    ingredients={recipes.recipes[i].ingredients}
                    image={recipes.recipes[i].image}
                    index={i}
                    key={i + ""}
                />
            )
        }
        setPreviews(temp);
    },   [recipes]);


    {/*
    useEffect(() => {
        async function fetchData() {
            const ingredients = food_categories;

            try {
                const response = await fetch('http://142.132.226.214:3010/recipes/get', {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"ingredients": ingredients}),
                });
                console.log(ingredients)
                const data = await response.json();
                console.log(data);

                if (data.length > 0) {
                    console.log("Recipes found!");
                    let temp = [];
                    for (let i = 0; i < data.length; i++) {
                        temp.push(<Preview name={data[i].description.name}
                                           ingredients={data[i].description.ingredients}
                                           image={data[i].img_url}
                                           index={i}
                                           key={i + ""}/>)
                    }
                    setPreviews(temp);
                } else {
                    console.log("No Recipe with that Ingredient!"); // todo error modal
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error or show an error modal
            }
        }

        fetchData();
    }, []);
    */}

    return (
        <div className="grid grid-cols-4">
            {previews}
            <Sign />
        </div>
    );
}
