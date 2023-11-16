import React from 'react';
import Ingredient from "./Ingredient";

function Recipe(props) {
    let name;
    let image;
    let description;
    let ingredients;

    return (
        <div>
            <div>Recipe {props.id}</div>
            <Ingredient />
        </div>
    );
}

export default Recipe;