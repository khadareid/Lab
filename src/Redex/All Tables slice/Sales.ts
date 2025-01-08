import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Sale {
  id: number;
  saleDate: string; // ISO Date string
  quantity: number;
  totalPrice: number;
  userId?: number | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

interface SaleState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  sales: Sale[];
}

const initialState: SaleState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  sales: [],
};

// Async Actions

// Create Sale
export const createSale = createAsyncThunk(
  'sale/create',
  async (saleData: Partial<Sale>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/sales`, saleData, {
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

// Fetch Sales
export const fetchSales = createAsyncThunk(
  'sale/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/sales`, {
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

// Update Sale
export const updateSale = createAsyncThunk(
  'sale/update',
  async (saleData: Sale, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/sales/${saleData.id}`,
        saleData,
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

// Delete Sale
export const deleteSale = createAsyncThunk(
  'sale/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      await axios.delete(`${baseUrl}/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted sale ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    resetSaleState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Sale
    builder.addCase(createSale.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSale.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.sales.push(action.payload);
    });
    builder.addCase(createSale.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Sales
    builder.addCase(fetchSales.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSales.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.sales = action.payload;
    });
    builder.addCase(fetchSales.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update Sale
    builder.addCase(updateSale.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSale.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.sales.findIndex(
        (sale) => sale.id === action.payload.id
      );
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    });
    builder.addCase(updateSale.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete Sale
    builder.addCase(deleteSale.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSale.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.sales = state.sales.filter(
        (sale) => sale.id !== action.payload
      );
    });
    builder.addCase(deleteSale.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetSaleState } = saleSlice.actions;
export default saleSlice.reducer;
