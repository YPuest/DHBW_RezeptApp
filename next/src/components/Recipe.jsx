"use client";
import React from 'react';
import RecipeIngredients from "./RecipeIngredients";
import Image from 'next/image';
import { useRecipeContext } from '@/components/Recipe-Provider';
import RecipeSteps from "@/components/RecipeSteps";
import {redirect} from "next/navigation";

export default function Recipe(props) {
    const { selectedRecipe } = useRecipeContext();

    console.log("SRRR")
    console.log(selectedRecipe);

    if (!selectedRecipe) {
        redirect('/');
        return <div>Loading...</div>;
    }

    const { name, difficulty, time, ingredients, preparation, im } = selectedRecipe.description;
    const { img_url } = selectedRecipe;

    //const {image} = 0;

    let prep = [];
    if (preparation) {
        for (let i = 0; i < preparation.length; i++) {
            prep.push(<div key={i}>Schritt {i + 1}</div>);
        }
    }

    function handleFavorite() {
        console.log("todo"); //todo
    }

    function handleBack() {
        window.history.back();
    }

    return (
        <div className="flex items-center">
            <div className="w-full max-w-4xl p-4 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="btn"
                        style={{backgroundColor: "#4CAF50", color: "#fff"}}
                        onClick={handleBack}
                    >
                        Zurück
                    </button>
                </div>
                <div className="flex flex-wrap items-center">
                    <div className="w-full sm:w-1/2 p-4">
                        <Image src={img_url} alt={name} width={400} height={300} className="rounded-lg" priority={true} />
                    </div>
                    <div className="w-full sm:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <div className="text-lg text-gray-700 mb-4">
                            <span className="font-semibold">Schwierigkeit: </span>{difficulty}
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <span className="font-semibold">Zeit: </span>{time}
                        </div>
                        <button
                            className="btn w-full mb-4"
                            style={{backgroundColor: "#4CAF50", color: "#fff"}}
                            onClick={handleFavorite}
                        >
                            Favorisieren
                        </button>
                    </div>
                </div>
                {preparation && <RecipeSteps steps={preparation} />}
            </div>
        </div>
    );
}
