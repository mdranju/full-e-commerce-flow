import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: (params) => ({
        url: '/product',
        params: { status: 'active', ...(params || {}) },
      }),
      providesTags: (result) =>
        result?.result
          ? [
              ...result.result.map(({ _id }: any) => ({ type: 'Product', id: _id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
      // Backend returns: { success, data: [...], pagination: { total, limit, page, totalPage } }
      transformResponse: (response: any) => ({
        result: response?.data ?? [],
        meta: response?.pagination ?? { page: 1, totalPage: 1, total: 0, limit: 20 },
      }),
    }),
    getSingleProduct: builder.query<any, string>({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getRelatedProducts: builder.query<any, { productId: string; categoryId: string }>({
      query: ({ productId, categoryId }) => `/product/related/${productId}/${categoryId}`,
      providesTags: (result, error, { productId }) => [{ type: 'Product', id: `RELATED-${productId}` }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getFeaturedProducts: builder.query<any, void>({
      query: () => '/product/featured',
      providesTags: [{ type: 'Product', id: 'FEATURED' }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getNewArrivals: builder.query<any, { limit?: number }>({
      query: (params) => ({
        url: '/product/new-arrivals',
        params: { limit: params?.limit || 10 },
      }),
      providesTags: [{ type: 'Product', id: 'NEW_ARRIVALS' }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetRelatedProductsQuery,
  useGetFeaturedProductsQuery,
  useGetNewArrivalsQuery,
} = productApi;
