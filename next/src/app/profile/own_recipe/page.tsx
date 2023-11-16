import React from "react";

import RecipePreview from '@/components/RecipePreview';

export default function OwnRecipes() {

    const recipes = [<RecipePreview isOwn="true"/>, <RecipePreview isOwn="true"/>]

    return (
        <div>
            <div className="flex justify-center">See own recipes</div>
            <div className="flex justify-center">
                {recipes}
            </div>
        </div>
    
    );
}