import React from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/utils/logo_template.jpg";

function Navbar() {
    return (
        <div className="flex justify-center mt-5 items-center">
            <input className="border-2 h-12 w-72 rounded-md p-3" type="text"/>
            <Link href="/profile" className="">
                <Image
                    className=''
                    src={logo}
                    alt="home"
                    width={60}
                    height={60}
                    priority={true}
                />
            </Link>
        </div>
    );
}

export default Navbar;