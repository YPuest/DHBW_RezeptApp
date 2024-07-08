// src/profile/login/RecipePreview.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipePreview from './RecipePreview';
import { useRecipeContext } from '@/components/Recipe-Provider';

// Mock the next/link
jest.mock('next/link', () => {
    return ({ children, href, onClick }) => (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    );
});

// Mock the Recipe-Provider
jest.mock('@/components/Recipe-Provider');

describe('RecipePreview Component', () => {
    const mockSelectRecipe = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        name: 'Recipe Name',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        image: '/image/path.jpg',
        difficulty: 'Easy',
        time: '30 mins',
        index: 0,
    };

    test('renders correctly', () => {
        render(<RecipePreview {...defaultProps} />);

        expect(screen.getByText('Recipe Name')).toBeInTheDocument();
        expect(screen.getByText('Ingredient 1, Ingredient 2')).toBeInTheDocument();
        expect(screen.getByAltText('Recipe Name')).toHaveAttribute('src', '/image/path.jpg');
        expect(screen.getByText('Easy')).toBeInTheDocument();
        expect(screen.getByText('30 mins')).toBeInTheDocument();
    });

    test('calls selectRecipe on click', () => {
        render(<RecipePreview {...defaultProps} />);

        fireEvent.click(screen.getByText('Recipe Name'));

        expect(mockSelectRecipe).toHaveBeenCalledWith(0);
    });
});
