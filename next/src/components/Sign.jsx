import React from 'react';

export default function (props) {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className="grid grid-cols-1">
                        <h3 className="font-bold text-lg">Login</h3>
                        <form>
                            <div>Username</div>
                            <input type="text"/>
                            <div>Password</div>
                            <input type="password"/>
                            <button type="submit" onClick={props.handleLogin}>Sign-In</button>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}