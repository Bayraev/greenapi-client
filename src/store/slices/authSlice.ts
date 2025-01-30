import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
  apiInstance: '',
  apiTokenInstance: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ apiInstance: string; apiTokenInstance: string }>
    ) => {
      state.apiInstance = action.payload.apiInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.apiInstance = '';
      state.apiTokenInstance = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;