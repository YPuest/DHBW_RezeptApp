import React from 'react';
import Ingredients from "./Ingredients";

function Recipe(props) {
    //GetData

    return (
        <div>
            <div>Recipe {props.id}</div>

            <Ingredients />
        </div>
    );
}

export default Recipe;