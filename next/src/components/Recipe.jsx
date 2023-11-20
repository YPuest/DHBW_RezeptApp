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
            <div>{ingredients}</div>
            <button className="button_1">Fav</button>

            <div>{preparation}</div>



        </div>
    );
}

export default Recipe;