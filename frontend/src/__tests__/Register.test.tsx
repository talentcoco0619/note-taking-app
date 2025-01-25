import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
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

describe('Register Component', () => {
    it('renders correctly with Redux store', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { access: 'this is fake access token', refresh: "this is fake refresh token" } });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Register/i });
        
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: "master" } });
            fireEvent.change(emailInput, { target: { value: "mastersuperdev@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });
            fireEvent.click(submitButton)
        });
        expect(usernameInput.value).toBe("master");
        expect(emailInput.value).toBe("mastersuperdev@gmail.com");
        expect(passwordInput.value).toBe("1234");
        await waitFor(() => {
            const state = store.getState();
            expect(state.auth.loading).toBeFalsy();
            expect(state.auth.error).toBeNull();
            expect(state.auth.success).toBeTruthy();
        });
    });
});