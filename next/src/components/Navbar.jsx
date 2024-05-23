"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Search from "@/components/Search";
import { deleteCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(getCookie('loggedIn')) {
            setIsLoggedIn(true)
        }
    })

    return (
        <div className="flex items-center justify-between mx-auto my-2">
            <Link href='/' className='ml-5'>RezeptApp</Link>

            <Search />

            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn m-1">Profile</label>

                {(isLoggedIn) ? (
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href='/profile/favorites' >Favorites</Link></li>
                        <li><button onClick={()=> {deleteCookie("loggedIn");
                            setIsLoggedIn(false);
                        }}>Logout</button></li>
                    </ul>
                ): (
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href="/profile/login" >Login</Link></li>
                    <li><Link href="/profile/register" >Register</Link></li>
                </ul>
                )}
            </div>
        </div>
    );
}

export default Navbar;