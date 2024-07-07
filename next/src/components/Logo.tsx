import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function RecipeSteps(props) {
    return (
        <div>
            <Link href='/' className='flex items-center ml-5'>
                <Image src="/images/logo.png" alt="Logo with name" width={props.width} height={props.height} className="mr-2" />
                <span className="text-xl font-bold font-mono">RezeptApp</span>
            </Link>
        </div>
    );
}