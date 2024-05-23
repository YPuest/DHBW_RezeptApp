"use client";
import React, {useState} from 'react';

export default function Favorites() {
    const [login_register_btn_text, setLogin_register_btn_text] = useState("placeholder");

    function handleLogin(){
        setLogin_register_btn_text("placeholder");
    }

    return (
        <>
            <div>Login</div>
            <input type='text' placeholder={"username"}></input>
            <input type='password' placeholder={"password"}></input>
            <button>{login_register_btn_text}</button>
            <button>{isLoggedIn}</button>
        </>
    );
}