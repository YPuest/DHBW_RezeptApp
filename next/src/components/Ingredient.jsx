import React from 'react';

function Ingredient(props) {
    let name;
    let amount;
    let unit;
    
    return (
        <div>
            {amount}, {name}, {unit}
        </div>
    );
}

export default Ingredient;