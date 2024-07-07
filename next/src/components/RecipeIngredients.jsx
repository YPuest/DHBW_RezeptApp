import React from 'react';

export default function RecipeIngredients(props) {
    let ingredients = [];
    for (let i = 0; i < props.ingredients.length; i++) {
        ingredients.push(<div key={i}>{props.ingredients[i]}</div>)
    }

    return (
        <div>
            {ingredients}
        </div>
    );
}