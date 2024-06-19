"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecipeContext } from '@/components/Recipe-Provider';
import RecipeSteps from "@/components/RecipeSteps";
import { redirect } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function Recipe(props) {
    let username;
    const [showFavButton, setShowFavButton] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        username = getCookie('user');
        console.log(username);

        if (username !== 'null') {
            setShowFavButton(true);
        } else {
            setShowFavButton(false);
        }

        let cookie_recipes = getCookie(username) || '';
        if (cookie_recipes.split(',').includes(name)) {
            setIsFavorited(true);
        }
    }, []);

    const { selectedRecipe } = useRecipeContext();

    if (!selectedRecipe) {
        redirect('/');
        return <div>Loading...</div>;
    }

    const { name, difficulty, time, ingredients, preparation, im } = selectedRecipe.description;
    const { img_url } = selectedRecipe;

    let prep = [];
    if (preparation) {
        for (let i = 0; i < preparation.length; i++) {
            prep.push(<div key={i}>Schritt {i + 1}</div>);
        }
    }

    function handleFavorite() {
        let username = getCookie('user');
        let cookie_recipes = getCookie(username) || '';
        let recipesArray = cookie_recipes.split(',').filter(recipe => recipe);

        if (!isFavorited) {
            recipesArray.push(name);
        } else {
            recipesArray = recipesArray.filter(recipe => recipe !== name);
        }

        setCookie(username, recipesArray.join(','));
        setIsFavorited(!isFavorited);
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
                        style={{ backgroundColor: "#4CAF50", color: "#fff" }}
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
                        {showFavButton && (
                            <button
                                className="btn w-full mb-4"
                                style={{
                                    backgroundColor: isFavorited ? "red" : "#4CAF50",
                                    color: "#fff"
                                }}
                                onClick={handleFavorite}
                            >
                                {isFavorited ? "Favorisiert" : "Favorisieren"}
                            </button>
                        )}
                    </div>
                </div>
                {preparation && <RecipeSteps steps={preparation} />}
            </div>
        </div>
    );
}
