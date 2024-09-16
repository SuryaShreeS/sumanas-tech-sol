// src/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE } from '../constants'; // Import constants

const initialState = {
  accessToken: null,
  email: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${AUTH0_DOMAIN}/oauth/token`,
        {
          grant_type: 'password',
          username: credentials.email,
          password: credentials.password,
          audience: AUTH0_AUDIENCE,
          client_id: AUTH0_CLIENT_ID,
          client_secret: AUTH0_CLIENT_SECRET,
        }
      );
      // Extract email from response or make another request to get user info
      const email = credentials.email; // This is a placeholder, adjust based on actual implementation
      return { accessToken: response.data.access_token, email };
    } catch (error) {
      return rejectWithValue('Invalid email or password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
