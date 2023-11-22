"use client";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

import food from '@/utils/food_template.jpg';
import heart from '@/utils/heart.png'
import {useRecipeContext} from "@/components/Recipe-Provider";

//yellow render warning
function RecipePreview(props) {
    const recipes = useRecipeContext()

    const name = props.name;
    const ingredientsFetch = props.ingredients;
    const img = props.image;
    let ingredients = ingredientsFetch[0];
    const index = props.index;

    for (let i = 1; i < ingredientsFetch.length; i++) {
        if (i != 0) {
            ingredients = ingredients + ", " + ingredientsFetch[i];
        }
    }

    function onClick(){
        recipes.selectRecipe(index)
    }

    return (
        <Link href="/recipe" onClick={onClick}>
            <div>
                <div className="card w-96 bg-white shadow-xl m-2">
                    <figure>
                        <Image src={img} alt="" width={200} height={150} priority={true}></Image>
                        {/*<Image src={img} alt="" width={200} height={150} priority={true}></Image>*/}
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{ingredients}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Easy</div>
                            <div className="badge badge-outline">30 min</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RecipePreview;