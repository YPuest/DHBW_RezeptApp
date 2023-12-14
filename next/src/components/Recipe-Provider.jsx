'use client';

import {createContext, useContext, useState} from 'react';

const RecipeContext = createContext();

export function useRecipeContext(){
    return useContext(RecipeContext);
}

export default function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([
        // Add more recipes as needed
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