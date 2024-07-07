// src/profile/login/Login.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './page';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// Mock the next/navigation and cookies-next
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        refresh: jest.fn(),
    }),
}));

jest.mock('cookies-next', () => ({
    setCookie: jest.fn(),
}));

describe('Login Component', () => {
    test('renders correctly', () => {
        render(<Login />);

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
        expect(screen.getByText('Einloggen')).toBeInTheDocument();
        expect(screen.getByText('Noch keinen Account?')).toBeInTheDocument();
        expect(screen.getByText('Hier Registrieren!')).toBeInTheDocument();
    });

    test('shows alert when username is empty', () => {
        render(<Login />);

        fireEvent.click(screen.getByText('Einloggen'));

        expect(screen.getByText('Kein Username')).toBeInTheDocument();
    });

    test('shows alert when password is empty', () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.click(screen.getByText('Einloggen'));

        expect(screen.getByText('Kein Passwort')).toBeInTheDocument();
    });

    test('makes an API call and sets cookies on successful login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        );

        const { push } = useRouter();

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.click(screen.getByText('Einloggen'));

        await waitFor(() => {
            expect(setCookie).toHaveBeenCalledWith('loggedIn', true);
            expect(setCookie).toHaveBeenCalledWith('user', 'user');
            expect(push).toHaveBeenCalledWith('/');
        });
    });

    test('shows alert on failed login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
            })
        );

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.click(screen.getByText('Einloggen'));

        await waitFor(() => {
            expect(screen.getByText('Die eingegebenen Daten stimmen nicht. Überprüfe sie.')).toBeInTheDocument();
        });
    });
});
