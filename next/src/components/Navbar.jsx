"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Search from "@/components/Search";
import { deleteCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

function Navbar({ onSearch }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (getCookie('loggedIn')) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    const handleLogout = () => {
        deleteCookie('loggedIn');
        setIsLoggedIn(false);
        window.location.reload(); // Page reload
    };

    return (
        <div className="flex items-center justify-between mx-auto my-2">
            <Link href='/' className='flex items-center ml-5' onClick={handleLogoClick}>
                <Image src="/images/logo.png" alt="Logo with name" width={40} height={40} className="mr-2" />
                <span className="text-xl font-bold font-mono">RezeptApp</span>
            </Link>
            <Search onSearch={onSearch} />

            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn m-1" style={{ backgroundColor: "#4CAF50", color: "#fff" }}>Profil</label>

                {isLoggedIn ? (
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href='/profile/favorites'>Favorites</Link></li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/profile/login">Login</Link></li>
                        <li><Link href="/profile/register">Register</Link></li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Navbar;
