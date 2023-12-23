"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import DeleteAccount from "@/components/DeleteAccount";
import Search from "@/components/Search";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    function handleDelete() {
        setIsDelete(true);
    }

    return (
        <div className="flex items-center justify-between mx-auto my-2">
            <Link href='/' className='ml-5'>RezeptApp</Link>

            <Search />

            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn m-1">Profile</label>

                {(isLoggedIn) ? (
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href='/profile/favorites' >Favorites</Link></li>
                        <li><Link href='/profile/options' >Edit Profile</Link></li>
                        <li><button onClick={handleDelete} >Delete Account</button></li>
                        {isDelete ? <DeleteAccount setIsDelete={setIsDelete} setIsLoggedIn={setIsLoggedIn}/> : <></>}
                            <li><button onClick={handleLogin} >Sign Out</button></li>
                    </ul>
                ): (
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={handleLogin} >Sign In</button></li>
                    <li><button onClick={handleLogin} >Register</button></li>
                    {/*<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Sign-In</button>
                */}</ul>
                )}
            </div>
        </div>
    );
}

export default Navbar;