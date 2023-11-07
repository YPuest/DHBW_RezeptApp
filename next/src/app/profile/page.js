"use client";

import {useState} from "react";

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    handleLogin(() => {

    });

    function handleLogin() {

    }

    return (
        (isLoggedIn)? (
            <div>
                <button>Create new recipe</button>
                <button>See own recipes</button>
                <button>Edit Account</button>
                <button>Delete Account</button>
            </div>
        ) :
        (
            <div>
                <button onClick={handleLogin}>Sign In</button>
                <button>Register</button>
            </div>
        )
    )
}
