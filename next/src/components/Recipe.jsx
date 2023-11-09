import React from 'react';
import Ingredients from "./Ingredients";

function Recipe(props) {
    let name;
    let image;
    let description;

    //GetData

    return (
        <div>
            <div>Recipe {props.id}</div>

            <Ingredients />
        </div>
    );
}

export default Recipe;