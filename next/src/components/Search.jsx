import React, {useState} from 'react';
import { useRecipeContext } from '@/components/Recipe-Provider';

function Search() {
    const [text, setText] = useState('');
    const recipes = useRecipeContext()

    async function handleSearch() {
        //Create array of ingredients
        let ingredients
        if(text.length === 0) {
            ingredients = [
                "nudeln",
                "ei",
                "speck",
                "kaese",
                "hackfleisch",
                "tomatensauce",
                "zwiebel",
                "knoblauch",
                "pesto",
                "parmesan",
                "olivenoel",
                "peperoncino",
                "petersilie",
                "sahne",
                "butter",
                "lasagneblaetter",
                "spinat",
                "ricotta",
                "mozzarella",
                "haehnchenbrust",
                "kokosmilch",
                "currypaste",
                "gemuese",
                "reis",
                "lachsfilet",
                "zitrone",
                "dill",
                "kartoffeln",
                "rindfleisch_ravioli",
                "paprika",
                "zucchini",
                "marinade",
                "tomaten",
                "frisches_basilikum",
                "gemischtes_gemuese",
                "basmatireis",
                "blaetterteig",
                "feta",
                "milch",
                "quinoa",
                "gebratenes_gemuese",
                "avocado",
                "hummus",
                "rote_linsen",
                "gewuerze",
                "vollkornnudeln",
                "basilikum",
                "karotten",
                "kirschtomaten",
                "mandeln",
                "balsamico",
                "aubergine",
                "couscous",
                "gurke",
                "camembert",
                "paniermehl",
                "preiselbeersauce",
                "cherrytomaten",
                "kichererbsen",
                "suesskartoffel",
                "vollkornbrot",
                "kresse",
                "linsen",
                "gemuesebruehe",
                "sellerie",
                "paella_reis",
                "erbsen"
            ];
        } else {
            let inputs = text.toLowerCase();
            inputs = inputs.replaceAll(" ", "");
            ingredients = inputs.split(",");
        }


        const response = await fetch('http://142.132.226.214:3010/recipes/get', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"ingredients": ingredients}),
        });

        const data = await response.json();
        console.log(data);

        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push({
                name: data[i].description.name,
                difficulty: data[i].description.name,
                time: data[i].description.time,
                ingredients: data[i].description.ingredients,
                preparation: data[i].description.preparation,
                image: data[i].img_url,
            })
            console.log(data[i].img_url);
        }

        recipes.setRecipes(temp);

        console.log(temp)
        console.log(recipes.recipes);

        if (data.length > 0) {
            console.log("Recipes found!")
        } else {
            console.log("No Recipe with that RecipeIngredients!") //todo error modal
        }
    }

    function handleKeyPress (event) {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <div className="join">
            <div>
                <div>
                    <input
                        className="input input-bordered join-item"
                        placeholder="Search"
                        onChange={e => setText(e.target.value)}
                        onKeyUp={(e) => handleKeyPress(e)}
                    />
                </div>
            </div>
            <div className="indicator">
                <button className="btn join-item" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default Search;