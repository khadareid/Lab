import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : {
      name: '',
      role: '',
      email: '',
      image: '',
      token: '',
    };

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.token = action.payload.token;

      // Store the user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(state));
    },

    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.name = '';
      state.role = '';
      state.email = '';
      state.token = '';
    },
  },
});

export default userInfoSlice;
export const { setUser, logout } = userInfoSlice.actions;
