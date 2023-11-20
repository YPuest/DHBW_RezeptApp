import React from 'react';
import Ingredient from "./Ingredient";
import Image from 'next/image';
import food from '@/utils/food_template.jpg';

function Recipe(props) {
    console.log("sad")

    let name = "name";
    let image = food;
    let description = props.description;
    let ingredients = props.ingredients;

    return (
        <div>
            <Image src={image} alt="" width={150} height={30} priority="true" className="rounded"/>
            <div>{name}</div>
            <Ingredient />
            <button className="button_1">Fav</button>
        </div>
    );
}

export default Recipe;