import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Transaction {
  id: number;
  amount: number;
  transactionDate: string;
  transactionType?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface TransactionState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  transactions: Transaction[];
}

const initialState: TransactionState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  transactions: [],
};

// Async Actions
// Create Transaction
export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (transactionData: Partial<Transaction>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/transactions`, transactionData, {
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

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/transactions`, {
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

// Update Transaction
export const updateTransaction = createAsyncThunk(
  'transaction/update',
  async (transactionData: Transaction, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/transactions/${transactionData.id}`,
        transactionData,
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

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
       await axios.delete(`${baseUrl}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted transaction ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactionState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.transactions.push(action.payload);
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch All
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update
    builder.addCase(updateTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    });
    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete
    builder.addCase(deleteTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    });
    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
