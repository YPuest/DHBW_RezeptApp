"use client";

import React, { useState } from 'react';

export default function CreateRecipe() {



    const [ingredients, setIngredients] = useState([
        <div>Amount (1,5)</div>,
        <input type="text" className='border-2 mb-2'/>,
        <div>Unit (ts)</div>,
        <input type="text"className='border-2 mb-2'/>,
        <div>Product (Apple)</div>,
        <input type="text"className='border-2 mb-5'/>
    ]);

    function handleAddIngredient(event) {
        event.preventDefault();

        const newIngredientDiv1 = <div key={ingredients.length + "div1"}>Amount</div>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientDiv1]);

        const newIngredientInput1 = <input key={ingredients.length + "input1"} className='border-2 mb-2'/>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientInput1]);

        const newIngredientDiv2 = <div key={ingredients.length + "div2"}>Unit</div>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientDiv2]);

        const newIngredientInput2 = <input key={ingredients.length + "input2"} className='border-2 mb-2'/>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientInput2]);

        const newIngredientDiv3 = <div key={ingredients.length + "div3"}>Product</div>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientDiv3]);

        const newIngredientInput3 = <input key={ingredients.length + "input3"} className='border-2 mb-5'/>;
        setIngredients(prevIngredients => [...prevIngredients, newIngredientInput3]);
    }

    function handleRemoveIngredient(event) {
        event.preventDefault();
    
        for (let i = 0; i < 6; i++) {
            setIngredients(prevIngredients => {
                const newIngredients = [...prevIngredients];
                newIngredients.pop();
                return newIngredients;
            });
        }
    }

    const [steps, setSteps] = useState([
        <div key="cs1">Step 1</div>,
        <input key="s1" type="text" className='border-2 mb-2'/>
    ]);

    function handleAddStep(event) {
        event.preventDefault();

        const newStepDiv = <div key={steps.length + "div"}>Step {steps.length/2 + 1}</div>;
        setSteps(prevSteps => [...prevSteps, newStepDiv]);

        const newStepInput = <input key={steps.length + "input"} className='border-2 mb-5'/>;
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
            <div className='flex justify-center font-bold text-lg m-5'>Create Recipe</div>
            <form className='grid grid-col mx-20'>
                <InputField placeholder='Title'/>
                <div>Title</div>
                <input type="text" required={true} className='border-2 mb-5'/>
                <div>Cooking time (seconds)</div>
                <input type="text" required={true} className='border-2 mb-5'/>
                <div>Portions</div>
                <input type="text" required={true} className='border-2 mb-5'/>
                <div>Difficulty (1-3)</div>
                <input type="number" required={true} min="1" max="3" className='border-2 mb-5'/>
                
                <div className='font-bold flex justify-center m-5'>Ingredient(s)</div>
                {ingredients}
                
                <button onClick={handleAddIngredient} className='button_1 m-2'>Add Ingredient</button>
                {ingredients.length > 6 ? <button onClick={handleRemoveIngredient} className='button_1 m-2'>Remove Ingredient</button> : <></>}
                
                <div className='font-bold flex justify-center m-5'>Steps</div>
                {steps}
                <button onClick={handleAddStep} className='button_1 m-2'>Add Step</button>
                {steps.length > 2 ? <button onClick={handleRemoveStep} className='button_1 m-2'>Remove Step</button> : <></>}
                <div>Upload Picture</div>
                
                <input type='file' className='button_1 m-7'/>
                
                <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Save</button>
            </form>
        </div>
    )
}