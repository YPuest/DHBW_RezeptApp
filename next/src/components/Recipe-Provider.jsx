'use client';

import {createContext, useContext, useState} from 'react';

const RecipeContext = createContext();

export function useRecipeContext(){
    return useContext(RecipeContext);
}

export default function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([
        {
            name: 'Recipe1',
            difficulty: 'Easy',
            time: '30 minutes',
            ingredients: ['Ingredient1', 'Ingredient2'],
            preparation: ['Step1', 'Step2'],
            image: "https://i.imgur.com/WaQ0dMz.png",
        },
        {
            name: 'Recipe2',
            difficulty: 'Easy',
            time: '30 minutes',
            ingredients: ['Ingredient1', 'Ingredient2'],
            preparation: ['Step1', 'Step2'],
            image: "https://i.imgur.com/WaQ0dMz.png",
        },
    ]);

    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);

    const selectedRecipe = recipes[selectedRecipeIndex];

    const contextValue = {
        recipes,
        selectedRecipeIndex,
        selectedRecipe,
        selectRecipe: (index) => setSelectedRecipeIndex(index),
        setRecipes,
    };

    return (
        <RecipeContext.Provider value={contextValue}>
            {children}
        </RecipeContext.Provider>
    );
}