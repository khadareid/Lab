import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl, errorMsg } from "../Interface";

interface response {
  id: number;
  name: string;
  email: string;
  password: string;}

interface stateInterface {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  data: response;
}

//

const initialState: stateInterface = {
  data: {} as response,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

// register function
export const LoginFn = createAsyncThunk(
  "user/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/User/Login`, data);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || errorMsg);
      }

      return rejectWithValue(errorMsg);
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  reducers: {
    resetlogin: () => initialState,
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(LoginFn.pending, (state, _) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = {} as response;
      state.errorMsg = "";
    });
    // fullfilled
    builder.addCase(LoginFn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload as response;
      state.errorMsg = "";
    });

    // error

    builder.addCase(LoginFn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = {} as response;
      state.errorMsg = String(action.payload);
    });
  },
});

export default LoginSlice;
export const { resetlogin } = LoginSlice.actions;
