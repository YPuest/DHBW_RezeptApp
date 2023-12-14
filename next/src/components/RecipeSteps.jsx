import React from 'react';

export default function RecipeSteps(props) {
    let steps = [];
    for (let i = 0; i < props.steps.length; i++) {
        steps.push(<div className="mt-2">Schritt {i}:</div>)
        steps.push(<div key={i}>{props.steps[i]}</div>)
    }

    return (
        <div className="mt-2">
            <div className="text-lg underline">Ablauf:</div>
            <div>{steps}</div>
        </div>
    );
}