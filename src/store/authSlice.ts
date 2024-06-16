import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'), // Loading a token from localStorage during initialization
  loading: false,
  error: null,
};

// A common error handler for all async actions
const handleAsyncError = (state: AuthState, action: any) => {
  state.loading = false;
  state.error = action.payload || 'Request failed';
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
      return response.data.token;
    } catch (error) {
      return rejectWithValue('Auth login error');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      return rejectWithValue('Auth refresh token error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Removing the token from localStorage when exiting
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload); // Saving the token in localStorage upon successful authentication
      })
      .addCase(login.rejected, (state, action) => {
        handleAsyncError(state, action);
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        handleAsyncError(state, action);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
