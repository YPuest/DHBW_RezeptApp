"use client"

import React from 'react';
import RecipeIngredients from "./RecipeIngredients";
import Image from 'next/image';
import { useRecipeContext } from '@/components/Recipe-Provider';
import RecipeSteps from "@/components/RecipeSteps";

export default function Recipe(props) {
    const recipes = useRecipeContext()

    const name = recipes.selectedRecipe.name;
    const difficulty = recipes.selectedRecipe.difficulty;
    const time = recipes.selectedRecipe.time;
    const ingredients = recipes.selectedRecipe.ingredients;
    const preparation = recipes.selectedRecipe.preparation;
    const image = recipes.selectedRecipe.image;

    let prep = [];
    for (let i = 0; i < preparation.length; i++) {
        prep.push(<div>Schritt {i + 1}</div>)
    }

    return (
        <div className="ml-2">
            <Image src={image} alt="" width={200} height={150} priority={true} className="rounded mr-2"></Image>
            <div className="flex">
            <div className="text-2xl mb-2 br-2 mr-2">{name}</div>
            <button className="h-8 text-start g-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            >Merken</button>
            </div>
            <div className="">Schwierigkeit: {difficulty}</div>
            <div>Dauer: {time}</div>
            <RecipeIngredients ingredients={ingredients} />
            <RecipeSteps steps={preparation} />
        </div>
    );
}