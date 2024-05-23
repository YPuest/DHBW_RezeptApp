
import {useState} from "react";

export default function DeleteAccount(props) {
  
    function handleCancel() {
        console.log("Click Cancel...")
        props.setIsDelete(false);
    }

    function handleDelete() {
        console.log("Click Delete...");
        props.setIsDelete(false);
        props.setIsLoggedIn(false);
    }

    return (
    <div className="bg-slate-400 rounded-lg">
        <div>Delete Account</div>
        <div>Are you sure that you want to delete this account?</div>
        <button onClick={handleDelete} className='button_1'>Delete</button>
        <button onClick={handleCancel} className='button_1'>Cancel</button>
    </div>
  )
}
