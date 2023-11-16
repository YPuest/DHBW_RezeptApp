"use client";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

import food from '@/utils/food_template.jpg';
import heart from '@/utils/heart.png'

//yellow render warning
function RecipePreview(props) {
    return (
        <div className="relative mx-2 ms-5">
            <Link href="/recipe/1">
                <div className="relative">
                    <Image
                        src={food}
                        alt="home"
                        width={200}
                        height={112}
                        priority={true}
                        placeholder="blur"
                        className="rounded-md"
                    />
                </div>
                <div className="flex justify-center font-bold bg-gray-300 rounded-md">Food name daisy</div>
            </Link>

            {!props.isOwn ? (
                <button
                    className="absolute top-0 right-0 p-1 hover:scale-125 border-2"
                    onClick={handleclick}
                >
                    <Image
                        src={heart}
                        alt="favorite"
                        width={35}
                        height={35}
                        priority={true}
                    />
                </button>
            ):(<></>)
            }
        </div>
    );
}

export default RecipePreview;