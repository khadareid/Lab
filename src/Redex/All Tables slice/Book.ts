import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl, errorMsg } from "../Interface";

interface Book {
  id: number;
  title: string;
  isbn?: string;
  summary?: string;
  publishedAt?: string; // ISO Date string
  available?: boolean;
  stock?: number;
  price?: number; // Price in cents
  authors: string[];
  bookType: "HARD" | "EBOOK"; // Assuming you have a BookType enum (e.g., 'HARD', 'EBOOK')
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  userId?: number | null;
  categoryId?: number;
}

interface BookState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  books: Book[];
}

const initialState: BookState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  books: [],
};

// Async Actions

// Create Book
export const createBook = createAsyncThunk(
  "book/create",
  async (bookData: Partial<Book>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).token?.token;
      const res = await axios.post(`${baseUrl}/books`, bookData, {
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

// Fetch Books
export const fetchBooks = createAsyncThunk(
  "book/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).token?.token;
      const res = await axios.get(`${baseUrl}/books`, {
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

// Update Book
export const updateBook = createAsyncThunk(
  "book/update",
  async (bookData: Book, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).token?.token;
      const res = await axios.put(`${baseUrl}/books/${bookData.id}`, bookData, {
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

// Delete Book
export const deleteBook = createAsyncThunk(
  "book/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).token?.token;
      await axios.delete(`${baseUrl}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted book ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBookState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Book
    builder.addCase(createBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books.push(action.payload);
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Books
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update Book
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete Book
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books = state.books.filter((book) => book.id !== action.payload);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetBookState } = bookSlice.actions;
export default bookSlice.reducer;
