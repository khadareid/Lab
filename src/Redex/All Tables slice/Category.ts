import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Category {
  id: number;
  name: string;
  type: string; // Assuming it's a string enum like "OTHER"
  createdAt: string;
  updatedAt: string;
  userId?: number;
}

interface CategoryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  categories: Category[];
}

const initialState: CategoryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  categories: [],
};

// Create Category
export const createCategory = createAsyncThunk(
  'category/create',
  async (categoryData: Partial<Category>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/Category`, categoryData, {
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

// Fetch All Categories
export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/Category`, {
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

// Update Category
export const updateCategory = createAsyncThunk(
  'category/update',
  async (categoryData: Category, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(`${baseUrl}/Category/${categoryData.id}`, categoryData, {
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

// Delete Category
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
     await axios.delete(`${baseUrl}/Category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted category's ID for filtering
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategoryState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Category
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories.push(action.payload);
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update Category
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
