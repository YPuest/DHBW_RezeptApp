"use client";

import Preview from "@/components/Test";
import React from "react";
import { useRecipeContext } from "@/components/Recipe-Provider";

export default function Home() {
    const food_categories = ["Potato", "Pasta", "Fish"] // "Dessert", "Side dishes", "Cocktails"
    const recipes = useRecipeContext();

    // fetch preview food
    const previews = food_categories.map((category) => (
        <div key={category}>
            <div className="flex justify-center mt-10 font-bold text-2xl">{category}</div>
            <div className="flex justify-center">
                {[...Array(3)].map((_, i) => (
                    <Preview key={`${category}-${i}`} />
                    ))}
            </div>
        </div>
    ));

    return (
        <div>
            {previews}
            <div>{recipes.selectedRecipe.name}</div>
        </div>
    );
}
