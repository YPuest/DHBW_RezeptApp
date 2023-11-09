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
                <Link href='/profile/create_recipe'>Create new recipe</Link>
                <Link href='/profile/own_recipe'>See own recipes</Link>
                <Link href='/profile/options'>Edit Profile</Link>
                <button onClick={handleDelete}>Delete Account</button>
                {isDelete ? <DeleteAccount setIsDelete={setIsDelete} setIsLoggedIn={setIsLoggedIn}/> : <></>}
                <button onClick={handleLogin}>Sign Out</button>
            </div>
        ) :
        (
            <div className="grid justify-center text-center">
                <button onClick={handleLogin}>Sign In</button>
                <button>Register</button>
            </div>
        )
    )
}
