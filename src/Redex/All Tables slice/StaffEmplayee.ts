import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Staff {
  id: number;
  name: string;
  email: string;
  role: string; 
  salary: number;
  createdAt: string;
  updatedAt: string;
  userId?: number | null;
}

interface StaffState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  staffList: Staff[];
}

const initialState: StaffState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  staffList: [],
};

// Async Actions
// Create Staff
export const createStaff = createAsyncThunk(
  'staff/create',
  async (staffData: Partial<Staff>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/staff`, staffData, {
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

// Fetch Staff
export const fetchStaff = createAsyncThunk(
  'staff/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/staff`, {
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

// Update Staff
export const updateStaff = createAsyncThunk(
  'staff/update',
  async (staffData: Staff, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(`${baseUrl}/staff/${staffData.id}`, staffData, {
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

// Delete Staff
export const deleteStaff = createAsyncThunk(
  'staff/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      await axios.delete(`${baseUrl}/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted staff ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    resetStaffState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffList.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = String(action.payload);
      })

      .addCase(fetchStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffList = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = String(action.payload);
      })

      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.staffList.findIndex(
          (staff) => staff.id === action.payload.id
        );
        if (index !== -1) state.staffList[index] = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = String(action.payload);
      })

      .addCase(deleteStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffList = state.staffList.filter(
          (staff) => staff.id !== action.payload
        );
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = String(action.payload);
      });
  },
});

export const { resetStaffState } = staffSlice.actions;
export default staffSlice.reducer;
