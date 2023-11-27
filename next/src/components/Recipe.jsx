"use client"

import React from 'react';
import RecipeIngredients from "./RecipeIngredients";
import Image from 'next/image';
import {useRecipeContext} from '@/components/Recipe-Provider';
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

        <div className="flex gap-4 flex-col m-8 text-base/8">
            <div className="grid gap-6 grid-cols-4">
                <div className="flex gap-4 flex-col">
                    <Image src={image} alt="" width={200} height={150} priority={true}></Image>
                    <div className="text-2xl fond-semibold">{name}</div>
                    <div>{difficulty}</div>
                    <div>{time}</div>
                    <RecipeIngredients ingredients={ingredients}/>
                </div>
                <button className="button_1">Fav</button>
                <div className="flex gap-4 flex-col col-span-3">
                    <div className="text-xl">Zubereitung</div>
                    <RecipeSteps steps={preparation}/>
                </div>
            </div>
        </div>
    );
}