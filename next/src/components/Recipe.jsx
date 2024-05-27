"use client";
import React from 'react';
import RecipeIngredients from "./RecipeIngredients";
import Image from 'next/image';
import { useRecipeContext } from '@/components/Recipe-Provider';
import RecipeSteps from "@/components/RecipeSteps";

export default function Recipe(props) {
    const recipes = useRecipeContext();

    const name = recipes.selectedRecipe.name;
    const difficulty = recipes.selectedRecipe.difficulty;
    const time = recipes.selectedRecipe.time;
    const ingredients = recipes.selectedRecipe.ingredients;
    const preparation = recipes.selectedRecipe.preparation;
    const image = recipes.selectedRecipe.image;

    let prep = [];
    for (let i = 0; i < preparation.length; i++) {
        prep.push(<div key={i}>Schritt {i + 1}</div>);
    }

    function handleFavorite() {
        console.log("todo") //todo
    }

    return (
        <div className="flex items-center bg-gray-100">
            <div className="w-full max-w-4xl p-4 min-h-screen">
                <div className="flex flex-wrap items-center">
                    <div className="w-full sm:w-1/2 p-4">
                        <Image src={image} alt={name} width={400} height={300} className="rounded-lg" priority={true} />
                    </div>
                    <div className="w-full sm:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <div className="text-lg text-gray-700 mb-4">
                            <span className="font-semibold">Schwierigkeit: </span>{difficulty}
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <span className="font-semibold">Zeit: </span>{time}
                        </div>
                        <button
                            className="btn w-full mb-4"
                            style={{backgroundColor: "#4CAF50", color: "#fff"}}
                            onClick={handleFavorite}
                        >
                            Favorisieren
                        </button>
                    </div>
                </div>
                <RecipeSteps steps={preparation}/>
            </div>
        </div>
    );
}
