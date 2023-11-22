"use client";

import Preview from "@/components/RecipePreview";
import React, { useState, useEffect } from "react";

export default function Home() {
    const food_categories = ["nudeln", "kartoffeln", "fisch", "hackfleisch", "knoblauch", "parmesan"];
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const ingredients = food_categories;

            try {
                const response = await fetch('http://142.132.226.214:3010/recipes/get', {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"ingredients": ingredients}),
                });

                const data = await response.json();
                console.log(data);

                if (data.length > 0) {
                    console.log("Recipes found!");
                    let temp = [];
                    for(let i = 0; i < data.length; i++) {
                        temp.push(<Preview name={data[i].description.name}
                                           ingredients={data[i].description.ingredients}
                                           image={data[i].img_url}
                                           key={i+""}/>)
                    }
                    setPreviews(temp);
                } else {
                    console.log("No Recipe with that Ingredient!"); // todo error modal
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error or show an error modal
            }
        }

        fetchData();
    }, []);

    // old preview generation
    /*const previews = food_categories.map((category) => (
        <div key={category}>
            <div className="flex justify-center mt-10 font-bold text-2xl">{category}</div>
            <div className="flex justify-center">
                {[...Array(3)].map((_, i) => (
                    <Preview key={`${category}-${i}`} />
                    ))}
            </div>
        </div>
    ));*/

    return (
        <div className="grid grid-cols-4">
            {previews}
        </div>
    );
}
