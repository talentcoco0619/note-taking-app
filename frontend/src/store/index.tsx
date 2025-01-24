import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Updated import
import noteReducer from './noteSlice';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;

const store = configureStore({
    reducer: {
        auth: authReducer, // Renamed to auth
        notes: noteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
