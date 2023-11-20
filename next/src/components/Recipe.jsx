"use client"

import React from 'react';
import Ingredient from "./Ingredient";
import Image from 'next/image';
import food from '@/utils/food_template.jpg';
import { useRecipeContext } from '@/components/Recipe-Provider';

function Recipe(props) {
    const recipes = useRecipeContext()

    const name = recipes.selectedRecipe.name;
    const difficulty = recipes.selectedRecipe.difficulty;
    const time = recipes.selectedRecipe.time;
    const ingredients = recipes.selectedRecipe.ingredients;
    const preparation = recipes.selectedRecipe.preparation;

    const image = food;

    return (
        <div>
            <Image src={image} alt="" width={150} height={30} priority="true" className="rounded"/>
            <div>{name}</div>
            <div>{difficulty}</div>
            <div>{time}</div>
            <div>{ingredients}</div>
            <div>{preparation}</div>

            <button className="button_1">Fav</button>
        </div>
    );
}

export default Recipe;