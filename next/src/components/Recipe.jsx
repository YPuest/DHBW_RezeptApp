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
        prep.push(<div>Schritt {i+1}</div>)
    }

    return (
        <div>
            <Image src={image} alt="" width={200} height={150} priority={true}></Image>
            <div>{name}</div>
            <div>{difficulty}</div>
            <div>{time}</div>
            <RecipeIngredients ingredients={ingredients} />
            <button className="button_1">Fav</button>
            <RecipeSteps steps={preparation} />
        </div>
    );
}