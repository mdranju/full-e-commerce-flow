import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData: any, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to place order');
  }
});

export const fetchOrders = createAsyncThunk('order/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/orders');
    return response.data; // expects array of orders
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

interface OrderState {
  orders: any[];
  currentOrder: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.isLoading = false; state.currentOrder = action.payload; })
      .addCase(placeOrder.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(fetchOrders.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.isLoading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
