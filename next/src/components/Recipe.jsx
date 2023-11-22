import React from 'react';
import Ingredients from "./Ingredients";
import food from '@/utils/food_template.jpg';
import Image from "next/image";

function Recipe(props) {
    let name = "Potato";
    let image = food;
    let description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

    //GetData

    return (
        <div className="flex gap-4 flex-col m-8">
            <div>Recipe {props.id}{name}</div>
            <div className="grid gap-4 grid-cols-4">
                <div className="flex gap-4 flex-col">
                    <div>
                        <Image
                            src={image}
                            alt="home"
                            priority={true}
                            placeholder="blur"
                            className="rounded-md"
                        />
                    </div>
                    <div>
                        <Ingredients/>
                    </div>
                </div>
                <div className="col-span-3">
                    {description}
                </div>
            </div>
        </div>
    );
}

export default Recipe;