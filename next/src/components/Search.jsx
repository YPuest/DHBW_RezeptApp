import React, {useState} from 'react';
import { useRecipeContext } from '@/components/Recipe-Provider';

//todo umlaute umformen

function Search() {
    const [text, setText] = useState('');
    const recipes = useRecipeContext()

    async function handleSearch() {
        //Create array of ingredients
        let inputs = text.toLowerCase();
        inputs = inputs.replaceAll(" ", "");
        const ingredients = inputs.split(",");
        console.log(JSON.stringify({"ingredients": ingredients}));

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
                difficulty: data[i].description.difficulty,
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
                <button className="btn join-item" style={{ backgroundColor: "#4CAF50", color: "#fff" }} onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default Search;