"use client";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

import food from '@/utils/food_template.jpg';
import heart from '@/utils/heart.png'

//yellow render warning
function RecipePreview(props) {
    const title = "Pilz-Gemüsepaella";
    const ingredientsFetch = ["Risottoreis", "Zwiebel", "Paprikaschote", "Erbsen", "Lauchzwiebel", "Champignon", "Bohnen"]

    let ingredients = ingredientsFetch[0];

    for (let i = 1; i < ingredientsFetch.length; i++) {
        if (i != 0) {
            ingredients = ingredients + ", " + ingredientsFetch[i];
        }
    }
    return (
        <Link href="/">
            <div>
                <div className="card w-96 bg-white shadow-xl m-2">
                    <figure>
                        <Image src={food} alt="food" priority={true}></Image>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {title}
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