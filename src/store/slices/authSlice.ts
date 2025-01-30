import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState } from '../../types';
import { toast } from 'sonner';

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ apiInstance: string; apiTokenInstance: string }>,
    ) => {
      const apiInstance = action.payload.apiInstance;
      const apiTokenInstance = action.payload.apiTokenInstance;

      // set in cookies
      Cookies.set('apiInstance', `${apiInstance}`, { expires: 1 });
      Cookies.set('apiTokenInstance', `${apiTokenInstance}`, { expires: 1 });

      toast.success('Вы авторизированы!');
      state.isAuthenticated = true;
    },
    logout: (state) => {
      const apiInstance = Cookies.get('apiInstance');

      if (apiInstance) {
        Cookies.remove('apiInstance');
        Cookies.remove('apiTokenInstance');

        toast.error('Вы вышли из аккаунта!');
      }

      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
