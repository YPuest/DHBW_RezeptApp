"use client";

import React from 'react';
import Link from "next/link";
import { useRecipeContext } from "@/components/Recipe-Provider";

function RecipePreview(props) {
    const recipes = useRecipeContext();

    const name = props.name;
    const ingredientsFetch = props.ingredients;
    const img = props.image;
    const difficulty = props.difficulty;
    const time = props.time;
    let ingredients = ingredientsFetch[0];
    const index = props.index;

    for (let i = 1; i < ingredientsFetch.length; i++) {
        ingredients = ingredients + ", " + ingredientsFetch[i];
    }

    function onClick() {
        recipes.selectRecipe(index);
    }

    return (
        <Link href="/recipe" onClick={onClick}>
            <div>
                <div className="card w-full h-96 bg-white shadow-xl m-2 flex flex-col">
                    <figure className="h-40">
                        <img src={img} alt={name} className="w-full h-full object-cover" />
                    </figure>
                    <div className="card-body flex-1 overflow-hidden">
                        <h2 className="card-title">
                            {name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="overflow-auto h-16">
                            {ingredients}
                        </p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">{difficulty}</div>
                            <div className="badge badge-outline">{time}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RecipePreview;
