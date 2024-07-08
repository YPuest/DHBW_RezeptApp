// src/profile/register/Register.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        refresh: jest.fn(),
    }),
}));

jest.mock('cookies-next', () => ({
    setCookie: jest.fn(),
}));

describe('Register Component', () => {
    test('renders correctly', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Passwort wiederholen')).toBeInTheDocument();
        expect(screen.getByText('Registrieren')).toBeInTheDocument();
        expect(screen.getByText('Schon einen Account?')).toBeInTheDocument();
        expect(screen.getByText('Hier Einloggen!')).toBeInTheDocument();
    });

    test('shows alert when username is empty', () => {
        render(<Register />);

        fireEvent.click(screen.getByText('Registrieren'));

        expect(screen.getByText('Kein Username')).toBeInTheDocument();
    });

    test('shows alert when password is empty', () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.click(screen.getByText('Registrieren'));

        expect(screen.getByText('Passwort fehlt')).toBeInTheDocument();
    });

    test('shows alert when passwords do not match', () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort wiederholen'), { target: { value: 'pass2' } });
        fireEvent.click(screen.getByText('Registrieren'));

        expect(screen.getByText('Die Passwörter stimmen nicht überein')).toBeInTheDocument();
    });

    test('makes an API call and sets cookies on successful registration', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
            })
        );

        const { push } = useRouter();

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort wiederholen'), { target: { value: 'pass' } });
        fireEvent.click(screen.getByText('Registrieren'));

        await waitFor(() => {
            expect(setCookie).toHaveBeenCalledWith('loggedIn', true);
            expect(setCookie).toHaveBeenCalledWith('user', 'user');
            expect(push).toHaveBeenCalledWith('/');
        });
    });

    test('shows alert on user already exists', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 400,
            })
        );

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'existingUser' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort wiederholen'), { target: { value: 'pass' } });
        fireEvent.click(screen.getByText('Registrieren'));

        await waitFor(() => {
            expect(screen.getByText('User existiert bereits')).toBeInTheDocument();
        });
    });

    test('shows alert on internal server error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            })
        );

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort'), { target: { value: 'pass' } });
        fireEvent.change(screen.getByPlaceholderText('Passwort wiederholen'), { target: { value: 'pass' } });
        fireEvent.click(screen.getByText('Registrieren'));

        await waitFor(() => {
            expect(screen.getByText('Interner Serverfehler, siehe Log. Not 400')).toBeInTheDocument();
        });
    });
});
