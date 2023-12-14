"use client";

import React, { useState, useEffect } from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";
import Sign from "@/components/Sign";
import RecipePreview from "@/components/RecipePreview";

export default function Home() {
    const food_categories = [
        "nudeln",
        "ei",
        "speck",
        "kaese",
        "hackfleisch",
        "tomatensauce",
        "zwiebel",
        "knoblauch",
        "pesto",
        "parmesan",
        "olivenoel",
        "peperoncino",
        "petersilie",
        "sahne",
        "butter",
        "lasagneblaetter",
        "spinat",
        "ricotta",
        "mozzarella",
        "haehnchenbrust",
        "kokosmilch",
        "currypaste",
        "gemuese",
        "reis",
        "lachsfilet",
        "zitrone",
        "dill",
        "kartoffeln",
        "rindfleisch_ravioli",
        "paprika",
        "zucchini",
        "marinade",
        "tomaten",
        "frisches_basilikum",
        "gemischtes_gemuese",
        "basmatireis",
        "blaetterteig",
        "feta",
        "milch",
        "quinoa",
        "gebratenes_gemuese",
        "avocado",
        "hummus",
        "rote_linsen",
        "gewuerze",
        "vollkornnudeln",
        "basilikum",
        "karotten",
        "kirschtomaten",
        "mandeln",
        "balsamico",
        "aubergine",
        "couscous",
        "gurke",
        "camembert",
        "paniermehl",
        "preiselbeersauce",
        "cherrytomaten",
        "kichererbsen",
        "suesskartoffel",
        "vollkornbrot",
        "kresse",
        "linsen",
        "gemuesebruehe",
        "sellerie",
        "paella_reis",
        "erbsen"
    ];
    const [previews, setPreviews] = useState([]);

    const recipes = useRecipeContext()

    useEffect(() => {
        handleFetch()
    },[])

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < recipes.recipes.length; i++) {
            temp.push(
                <RecipePreview
                    name={recipes.recipes[i].name}
                    ingredients={recipes.recipes[i].ingredients}
                    image={recipes.recipes[i].image}
                    difficulty={recipes.recipes[i].difficulty}
                    time={recipes.recipes[i].time}
                    index={i}
                    key={i + ""}
                />
            )
        }
        setPreviews(temp);
    },   [recipes]);

    async function handleFetch() {
        const response = await fetch('http://142.132.226.214:3010/recipes/get', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"ingredients": food_categories}),
        });

        const data = await response.json();
        console.log(data);

        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push({
                name: data[i].description.name,
                difficulty: data[i].description.name,
                time: data[i].description.time,
                ingredients: data[i].description.ingredients,
                preparation: data[i].description.preparation,
                image: data[i].img_url,
            })
            console.log(data[i].img_url);
        }

        recipes.setRecipes(temp);
    }

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
        <div className="grid grid-cols-3 mx-auto items-center ml-20">
            {previews}
        </div>
    );
}
