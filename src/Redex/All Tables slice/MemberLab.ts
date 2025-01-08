import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl, errorMsg } from '../Interface';

interface Member {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  membershipType: 'REGULAR' | 'PREMIUM';
  borrowRecords: any[]; 
  createdAt: string; 
  updatedAt: string; 
  userId?: number | null;
}

interface MemberState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  members: Member[];
}

const initialState: MemberState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  members: [],
};

// Async Actions

// Create Member
export const createMember = createAsyncThunk(
  'member/create',
  async (memberData: Partial<Member>, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.post(`${baseUrl}/members`, memberData, {
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

// Fetch Members
export const fetchMembers = createAsyncThunk(
  'member/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.get(`${baseUrl}/members`, {
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

// Update Member
export const updateMember = createAsyncThunk(
  'member/update',
  async (memberData: Member, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      const res = await axios.put(
        `${baseUrl}/members/${memberData.id}`,
        memberData,
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

// Delete Member
export const deleteMember = createAsyncThunk(
  'member/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token?.token;
      await axios.delete(`${baseUrl}/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted member ID
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// Slice
export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    resetMemberState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Member
    builder.addCase(createMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.members.push(action.payload);
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Fetch Members
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Update Member
    builder.addCase(updateMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.members.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });

    // Delete Member
    builder.addCase(deleteMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { resetMemberState } = memberSlice.actions;
export default memberSlice.reducer;
