import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";
interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: any | null;
  username: string | null;
}
const token = localStorage.getItem("token")
const access = token ? JSON.parse(token).access : null
const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  isAuthenticated: access ? true : false,
  token: access || null,
  username: localStorage.getItem("username") || null
};

const setAuthHeader = (token: string) => {
  if (token) {
    // Set Authorization header with Bearer token
    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
  } else {
    // Optionally, you can clear the Authorization header if there's no token
    delete axios.defaults.headers["Authorization"];
  }
};
setAuthHeader(access)
// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/register/', userData);
      toast.success("Register successfully!")
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.email || error.response?.data?.username || error.message || 'Registration failed')
      return rejectWithValue(
        error.response?.data?.email || error.response?.data?.username || error.message || 'Registration failed'
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/login/', userData);
      const data = response.data;
      toast.success("Login successfully!")
      setAuthHeader(data.access)
      return data; // Assuming the API returns a token on login success
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || 'Login failed')
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      setAuthHeader("")
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.token = { access: action.payload.access, refresh: action.payload.refresh };
        state.username = action.payload.username;
        localStorage.setItem('token', JSON.stringify(state.token) || ''); // Store token
        localStorage.setItem('username', state.username || '')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
