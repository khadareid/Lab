import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Order {
  id: number;
  orderDate: string; // ISO Date string
  totalPrice: number;
  quantity: number;
  bookId: number;
  userId?: number | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

interface OrderState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  orders: Order[];
}

const initialState: OrderState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  orders: [],
};

// Async Actions

// Create Order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/orders`, orderData, {
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

// Fetch Orders
export const fetchOrders = createAsyncThunk(
  'order/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/orders`, {
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

// Update Order
export const updateOrder = createAsyncThunk(
  'order/update',
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/orders/${orderData.id}`,
        orderData,
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

// Delete Order
export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      await axios.delete(`${baseUrl}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted order ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update Order
    builder.addCase(updateOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete Order
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
