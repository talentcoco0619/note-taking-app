import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
beforeAll(() => {
    global.matchMedia = global.matchMedia || function () {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    };
});

describe('Login Component', () => {
    it('renders correctly with Redux store', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { access: 'this is fake access token', refresh: "this is fake refresh token" } });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Log In/i });

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: "mastersuperdev@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });
            fireEvent.click(submitButton)
        });
        expect(emailInput.value).toBe("mastersuperdev@gmail.com");
        expect(passwordInput.value).toBe("1234");
        await waitFor(() => {
            const state = store.getState();
            expect(state.auth.isAuthenticated).toEqual(true);
            expect(state.auth.loading).toBeFalsy();
            expect(state.auth.error).toBeNull();
        });
    });
});