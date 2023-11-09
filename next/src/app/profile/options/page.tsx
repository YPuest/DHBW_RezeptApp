"use client";

import React, { useState } from 'react';

export default function AccountOptions () {

    const Account = "";

    const [username, setUsername] = useState("username");
    const [birthdate, setBirthdate] = useState("birthdate");
    const [addressStreet, SetAddressStreet] = useState("addressStreet");
    const [addressNumber, SetAddressNumber] = useState("addressNumber");
    const [addressZIP, SetAddressZIP] = useState("addressZIP");
    const [addressCity, SetAddressCity] = useState("addressCity");
    const [phonenumber, setPhonenumber] = useState("phonenumber");
    const [email, setEmail] = useState("email");


    const [isDisabled , setIsDisabled] = useState(true);
    const [edit, setEdit] = useState("Edit");

    function handleEdit(event) {
        event.preventDefault();

        setIsDisabled(!isDisabled);

        if (isDisabled) {
            setEdit("Save");
        } else {
            setEdit("Edit");
        }

        //Save to database
    }

    return (
        <div>
            <div className='flex flex-col w-40'>
                <form>
                    <input type='text' disabled={isDisabled} placeholder={username} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={birthdate} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={addressStreet} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={addressNumber} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={addressZIP} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={addressCity} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={phonenumber} className='border-2'></input>
                    <input type='text' disabled={isDisabled} placeholder={email} className='border-2'></input>
                    <button type='submit' onClick={handleEdit}>{edit}</button>
                    
                </form>

            </div>
        </div>
    );
}