import React from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/utils/logo_template.jpg";

function Navbar() {
    return (
        <div className="flex items-center justify-between mx-auto my-2">
            <Link href='/' className='ml-5'>RezeptApp</Link>
            <input className="border-2 h-12 w-72 rounded-md p-3" type="text" placeholder='Search: Potato, Tomato'/>
            <div className='flex mr-5'>
                <Link href='/marked'>Marked</Link>
                <Link href='/profile' className='ml-5'>Profile</Link>
            </div>
        </div>
    );
}

export default Navbar;