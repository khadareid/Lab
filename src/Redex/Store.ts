import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./All Tables slice/user"; // Import the default export from the user slice
import LoginSlice from "./All Tables slice/Login";
import userInfoSlice from "./UserInfo";
import { categorySlice } from "./All Tables slice/Category";
import { memberSlice } from "./All Tables slice/MemberLab";

export const store = configureStore({
  reducer: {
    Allusers: userReducer,
    Category: categorySlice.reducer, // Use the reducer property
    Login: LoginSlice.reducer,
    userInfo: userInfoSlice.reducer,
    membership: memberSlice.reducer,

  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
