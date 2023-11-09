"use client";

import React, { useState } from 'react';



export default function CreateRecipe() {

    const [steps, setSteps] = useState([
        <div key="cs1">Step 1</div>,
        <input key="s1" type="text" className='border-2'/>
    ]);


    function handleAddStep(event) {
        event.preventDefault();

        const newStepDiv = <div key={steps.length + "div"}>Step {steps.length/2 + 1}</div>;
        setSteps(prevSteps => [...prevSteps, newStepDiv]);

        const newStepInput = <input key={steps.length + "input"} className='border-2'/>;
        setSteps(prevSteps => [...prevSteps, newStepInput]);
    }

    function handleRemoveStep(event) {
        event.preventDefault();
    
        for (let i = 0; i < 2; i++) {
            setSteps(prevSteps => {
                const newSteps = [...prevSteps];
                newSteps.pop();
                return newSteps;
            });
        }
    }

    return(
        <div className=''>
            <div className='flex justify-center'>Create Recipe</div>
            <form className='grid grid-col mx-20'>
                <div>Title</div>
                <input type="text" className='border-2'/>
                <div>Cooking time (seconds)</div>
                <input type="text" className='border-2'/>
                <div>Difficulty (1-3)</div>
                <input type="text" className='border-2'/>
                <div>Ingredients (1 Apple; 2ts Salt; usw.)</div>
                <input type="text" className='border-2'/>
                <div>Upload Picture</div>
                <input type='file' className='button_1'/>
                {steps}
                <button onClick={handleAddStep} className='button_1'>New Step</button>
                {steps.length > 2 ? <button onClick={handleRemoveStep} className='button_1'>Remove Step</button> : <></>}
                <button type="submit" className='button_1'>Save</button>
            </form>
        </div>
    )
}