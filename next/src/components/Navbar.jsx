import React from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/utils/logo_template.jpg";

function Navbar(props) {
    return (
        <div className="flex">
            <input type="text"/>
            <Link href="/profile">
                <Image
                    className=''
                    src={logo}
                    alt="home"
                    width={35}
                    height={35}
                />
            </Link>
        </div>
    );
}

export default Navbar;