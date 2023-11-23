import React from 'react';

export default function RecipeSteps(props) {
    let steps = [];
    for (let i = 0; i < props.steps.length; i++) {
        steps.push(`Schritt ${i}`)
        steps.push(<div>{props.steps[i]}</div>)
    }

    return (
        <div>
            {steps}
        </div>
    );
}