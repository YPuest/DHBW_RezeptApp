"use client";

import {useState} from "react";

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        (isLoggedIn)? (
            <div className="grid">
                <button>Create new recipe</button>
                <button>See own recipes</button>
                <button>Edit Account</button>
                <button>Delete Account</button>
                <button onClick={handleLogin}>Sign Out</button>
            </div>
        ) :
        (
            <div className="grid">
                <button onClick={handleLogin}>Sign In</button>
                <button>Register</button>
            </div>
        )
    )
}
