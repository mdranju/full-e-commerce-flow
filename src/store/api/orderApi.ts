import { baseApi } from './baseApi';

export const orderApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: '/order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getMyOrders: builder.query<any, { limit?: number; page?: number } | void>({
      query: (params) => ({
        url: '/order/my-orders',
        params: params || {},
      }),
      providesTags: ['Order'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getSingleOrder: builder.query<any, string>({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    trackOrder: builder.query<any, { orderId: string }>({
      query: (params) => ({
        url: '/order/track',
        params,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
  useTrackOrderQuery,
  useLazyTrackOrderQuery,
} = orderApiSlice;
