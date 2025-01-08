import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Library {
  id: number;
  name: string;
  address?: string | null;
  phoneNumber?: string | null;
  email: string;
  website?: string | null;
  establishedDate?: string | null; // ISO string for date
  description?: string | null;
  openHours?: string | null;
  capacity?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LibraryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  libraries: Library[];
}

const initialState: LibraryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  libraries: [],
};

// Async Actions
// Create Library
export const createLibrary = createAsyncThunk(
  'library/create',
  async (libraryData: Partial<Library>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/libraries`, libraryData, {
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

// Fetch Libraries
export const fetchLibraries = createAsyncThunk(
  'library/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/libraries`, {
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

// Update Library
export const updateLibrary = createAsyncThunk(
  'library/update',
  async (libraryData: Library, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/libraries/${libraryData.id}`,
        libraryData,
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

// Delete Library
export const deleteLibrary = createAsyncThunk(
  'library/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      await axios.delete(`${baseUrl}/libraries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted library ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetLibraryState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createLibrary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createLibrary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.libraries.push(action.payload);
    });
    builder.addCase(createLibrary.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch All
    builder.addCase(fetchLibraries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLibraries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.libraries = action.payload;
    });
    builder.addCase(fetchLibraries.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update
    builder.addCase(updateLibrary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLibrary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.libraries.findIndex(
        (library) => library.id === action.payload.id
      );
      if (index !== -1) {
        state.libraries[index] = action.payload;
      }
    });
    builder.addCase(updateLibrary.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete
    builder.addCase(deleteLibrary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteLibrary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.libraries = state.libraries.filter(
        (library) => library.id !== action.payload
      );
    });
    builder.addCase(deleteLibrary.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetLibraryState } = librarySlice.actions;
export default librarySlice.reducer;
