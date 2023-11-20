'use client';

import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export function useThemContext(){
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
    const [name, setName] = useState('nnn');
    const [difficulty, setDifficulty] = useState('');
    const [time, setTime] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [preparation, setPreparation] = useState([]);

    return (
        <ThemeContext.Provider value={{
            name, setName,
            difficulty, setDifficulty,
            time, setTime,
            ingredients, setIngredients,
            preparation, setPreparation}}
        >
            {children}
        </ThemeContext.Provider>
    );
}