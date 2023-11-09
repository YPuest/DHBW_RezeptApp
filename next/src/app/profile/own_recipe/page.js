import React from "react";

import Preview from '@/components/Preview';

export default function OwnRecipes() {

    const recipes = [<Preview isOwn="true"/>, <Preview isOwn="true"/>]

    return (
        <div>
            <div className="flex justify-center">See own recipes</div>
            <div className="flex justify-center">
                {recipes}
            </div>
        </div>
    
    );
}