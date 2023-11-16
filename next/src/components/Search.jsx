import React, {useState} from 'react';

function Search(props) {
    const [text, setText] = useState('');

    async function handleSearch() {
        console.log(text);

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
        console.log(data)
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