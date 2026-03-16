import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params: { category?: string; search?: string } | void, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/products', { params: params || {} });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

interface ProductState {
  items: any[];
  currentProduct: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  currentProduct: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(fetchSingleProduct.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => { state.isLoading = false; state.currentProduct = action.payload; })
      .addCase(fetchSingleProduct.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
  },
});

export default productSlice.reducer;
