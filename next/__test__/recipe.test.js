import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Recipe from './Recipe';
import { useRecipeContext } from '@/components/Recipe-Provider';
import { redirect } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

// Mock the cookies-next
jest.mock('cookies-next', () => ({
    getCookie: jest.fn(),
    setCookie: jest.fn(),
}));

describe('Recipe Component', () => {
    const mockSelectedRecipe = {
        description: {
            name: 'Recipe Name',
            difficulty: 'Easy',
            time: '30 mins',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            preparation: ['Step 1', 'Step 2'],
        },
        img_url: '/image/path.jpg',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders recipe details correctly', () => {
        render(<Recipe />);

        expect(screen.getByText('Recipe Name')).toBeInTheDocument();
        expect(screen.getByText('Schwierigkeit: Easy')).toBeInTheDocument();
        expect(screen.getByText('Zeit: 30 mins')).toBeInTheDocument();
        expect(screen.getByAltText('Recipe Name')).toHaveAttribute('src', '/image/path.jpg');
        expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
        expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    test('handles favorite button click', () => {
        render(<Recipe />);

        const favoriteButton = screen.getByText('Favorisieren');

        fireEvent.click(favoriteButton);

        expect(setCookie).toHaveBeenCalledWith('testUser', 'Recipe Name');
    });

    test('handles back button click', () => {
        render(<Recipe />);

        const backButton = screen.getByText('Zurück');

        fireEvent.click(backButton);

        expect(window.history.back).toHaveBeenCalledTimes(1);
    });
});
