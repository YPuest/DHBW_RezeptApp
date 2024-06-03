import React from 'react';

export default function RecipeSteps(props) {
    const customGreenBorderStyle = {
        borderLeft: '4px solid #4CAF50'
    };

    const steps = props.steps.map((step, index) => (
        <div key={index} className="mb-4">
            <div style={customGreenBorderStyle} className="pl-4">
                <p className="text-lg font-semibold">Schritt {index + 1}</p>
                <p className="ml-2">{step}</p>
            </div>
        </div>
    ));

    return (
        <div>
            {steps}
        </div>
    );
}
