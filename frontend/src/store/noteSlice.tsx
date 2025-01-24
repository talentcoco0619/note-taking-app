import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutUser } from './authSlice';
interface Note {
    id?: number;
    title: string;
    description: string;
    date: string;
    user: number;
}

interface NoteState {
    notes: Note[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: NoteState = {
    notes: [],
    loading: false,
    error: null,
};

// Async thunk to create a note
export const createNote = createAsyncThunk(
    'notes/createNote',
    async (formData: FormData, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('/api/notes/', formData);
            return response.data;
        } catch (error: any) {
            dispatch(logoutUser())
            return rejectWithValue(error.response?.data || 'Failed to create the note.');
        }
    }
);

// Async thunk to fetch all notes
export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get('/api/notes/');
            return response.data;
        } catch (error: any) {
            dispatch(logoutUser())
            return rejectWithValue(error.response?.data || 'Failed to fetch notes.');
        }
    }
);

// Async thunk to update a note
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, formData }: { id: number; formData: FormData }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/notes/${id}/`, formData);
            return response.data;
        } catch (error: any) {
            dispatch(logoutUser())
            return rejectWithValue(error.response?.data || 'Failed to update the note.');
        }
    }
);

// Async thunk to delete a note
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id: number, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`/api/notes/${id}/`);
            return id; // Return the ID of the deleted note
        } catch (error: any) {
            dispatch(logoutUser())
            return rejectWithValue(error.response?.data || 'Failed to delete the note.');
        }
    }
);

// Note slice
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle createNote
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handle fetchNotes
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handle updateNote
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                const index = state.notes.findIndex((note) => note.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handle deleteNote
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.notes = state.notes.filter((note) => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default noteSlice.reducer;
