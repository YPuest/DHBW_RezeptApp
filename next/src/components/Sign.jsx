import React from 'react';

export default function (props) {
    return (
        <div>
            <form className='grid'>
                <div>Username</div>
                <input className='border-2'></input>
                <div>Password</div>
                <input className='border-2'></input>
                <button type='submit' className='button_1' onClick={props.handleLogin}>Sign-In</button>
                <button type='submit' className='button_1'>Register</button>
            </form>
        </div>
    );
}