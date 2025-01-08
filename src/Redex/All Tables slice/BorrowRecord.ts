import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface BorrowRecord {
  id: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string | null;
  fine: number;
  memberId: number;
  bookId: number;
  createdAt: string;
  updatedAt: string;
  userId?: number | null;
}

interface BorrowRecordState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  borrowRecords: BorrowRecord[];
}

const initialState: BorrowRecordState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  borrowRecords: [],
};

// Async Actions
// Create BorrowRecord
export const createBorrowRecord = createAsyncThunk(
  'borrowRecord/create',
  async (borrowRecordData: Partial<BorrowRecord>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/borrowRecords`, borrowRecordData, {
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

// Fetch BorrowRecords
export const fetchBorrowRecords = createAsyncThunk(
  'borrowRecord/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/borrowRecords`, {
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

// Update BorrowRecord
export const updateBorrowRecord = createAsyncThunk(
  'borrowRecord/update',
  async (borrowRecordData: BorrowRecord, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/borrowRecords/${borrowRecordData.id}`,
        borrowRecordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Delete BorrowRecord
export const deleteBorrowRecord = createAsyncThunk(
  'borrowRecord/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.delete(`${baseUrl}/borrowRecords/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted record ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const borrowRecordSlice = createSlice({
  name: 'borrowRecord',
  initialState,
  reducers: {
    resetBorrowRecordState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createBorrowRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBorrowRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.borrowRecords.push(action.payload);
    });
    builder.addCase(createBorrowRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch All
    builder.addCase(fetchBorrowRecords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBorrowRecords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.borrowRecords = action.payload;
    });
    builder.addCase(fetchBorrowRecords.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update
    builder.addCase(updateBorrowRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBorrowRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.borrowRecords.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.borrowRecords[index] = action.payload;
      }
    });
    builder.addCase(updateBorrowRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete
    builder.addCase(deleteBorrowRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBorrowRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.borrowRecords = state.borrowRecords.filter(
        (record) => record.id !== action.payload
      );
    });
    builder.addCase(deleteBorrowRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetBorrowRecordState } = borrowRecordSlice.actions;
export default borrowRecordSlice.reducer;
