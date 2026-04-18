import { baseApi } from './baseApi';

export const wishlistApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<any[], void>({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    addToWishlist: builder.mutation<any, string>({
      query: (productId) => ({
        url: '/wishlist',
        method: 'POST',
        body: { product: productId },
      }),
      invalidatesTags: ['Wishlist'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    removeFromWishlist: builder.mutation<any, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApiSlice;
