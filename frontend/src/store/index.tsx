import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Updated import
import noteReducer from './noteSlice';
import axios from "axios";
import { config } from '../../config';

axios.defaults.baseURL = config.API_URL;

const store = configureStore({
    reducer: {
        auth: authReducer, // Renamed to auth
        notes: noteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
