import React, { useState } from 'react';

function Search({ onSearch }) {
    const [text, setText] = useState('');

    async function handleSearch() {
        onSearch(text);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
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
                        onKeyUp={handleKeyPress}
                    />
                </div>
            </div>
            <div className="indicator">
                <button className="btn join-item" style={{ backgroundColor: "#4CAF50", color: "#fff" }} onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default Search;
