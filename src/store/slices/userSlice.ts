import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (data: any, thunkAPI) => {
  try {
    const response = await axiosInstance.put('/user/profile', data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile');
  }
});

interface UserState {
  profile: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.isLoading = false; state.profile = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(updateProfile.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.isLoading = false; state.profile = action.payload; })
      .addCase(updateProfile.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
  },
});

export default userSlice.reducer;
