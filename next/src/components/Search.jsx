import React, {useState} from 'react';
import { useThemContext } from "@/components/Recipe-Provider";

function Search(props) {
    const [text, setText] = useState('');
    const recipe = useThemContext();

    async function handleSearch() {
        console.log(text);
        console.log(recipe.name);
        recipe.setName(text);

        //todo split at "," and remove whitespaces and error when not correct ingredient
        const inputs = text.toLowerCase();
        const ingredients = inputs.split(", ");
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

        if (data.length > 0) {
            console.log(data[0].description.ingredients);
            recipe.setName(data[0].description.name);
        } else {
            console.log("No Recipe with that Ingredient") //todo error modal
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
            <div>{recipe.name}</div>
        </div>
    );
}

export default Search;