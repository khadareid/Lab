import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

interface UserState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  users: User[];
  userInfo: User | null;
  token: string | null;
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  users: [],
  userInfo: null,
  token: localStorage.getItem('token') || null, 
};

// Login User
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/User/Login`, loginData);
      const { user, token } = res.data;

      // Store token in localStorage for persistence
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || errorMsg);
      }
      return rejectWithValue(errorMsg);
    }
  }
);


// Create User
export const createUser = createAsyncThunk(
  'user/create',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/User/register`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Fetch All Users
export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/User/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: User, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(`${baseUrl}/users/${userData.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.delete(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted user's ID for filtering
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Create User
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetUserState, logout } = userSlice.actions;
export default userSlice.reducer;
