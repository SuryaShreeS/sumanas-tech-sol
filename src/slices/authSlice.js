// src/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  accessToken: null,
  email: null, // Add email to state
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://dev-ztbgjd8qex1n4eqp.us.auth0.com/oauth/token',
        {
          grant_type: 'password',
          username: credentials.email,
          password: credentials.password,
          audience: 'https://dev-ztbgjd8qex1n4eqp.us.auth0.com/api/v2/',
          client_id: 'b8oa8G7Fs76llmtmgHXoPWcXpvmi7eZ7',
          client_secret: 'cUHRGh8ROs-WYNsqE22VMG64WA7GrDU2J9QcGVPsWEYv3imTCtUZ7EuQlQcXHG4-',
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
        state.email = action.payload.email; // Save email
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
