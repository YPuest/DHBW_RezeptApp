import React from 'react';


export default function RecipeIngredients(props) {
    let ingredients = [];
    for (let i = 0; i < props.ingredients.length; i++) {
        ingredients.push(<div key={i}>{props.ingredients[i]}</div>)
    }

    return (
        <div className="mb-2 mt-2">
            <div className="text-lg underline">Zutaten:</div>
            <div>{ingredients}</div>
        </div>
    );
}