"use client";

import {useState} from "react";
import Link from 'next/link';

import DeleteAccount from '@/components/DeleteAccount';

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    function handleDelete() {
        setIsDelete(true);
    }

    return (
        (isLoggedIn)? (
            <div className="grid justify-center text-center">
                <Link href='/profile/create_recipe' className="button_1">Create new recipe</Link>
                <Link href='/profile/own_recipe' className="button_1">See own recipes</Link>
                <Link href='/profile/options' className="button_1">Edit Profile</Link>
                <button onClick={handleDelete} className="button_1">Delete Account</button>
                {isDelete ? <DeleteAccount setIsDelete={setIsDelete} setIsLoggedIn={setIsLoggedIn}/> : <></>}
                <button onClick={handleLogin} className="button_1">Sign Out</button>
            </div>
        ) :
        (
            <div className="grid justify-center text-center">
                <button onClick={handleLogin} className="button_1">Sign In</button>
                <button className="button_1">Register</button>
            </div>
        )
    )
}
