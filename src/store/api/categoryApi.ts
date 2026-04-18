import { baseApi } from './baseApi';

export const categoryApiSlice = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query<any[], any | void>({
      query: (params) => ({
        url: '/category',
        params: { status: 'active', ...(params || {}) },
      }),
      providesTags: ['Category'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getSingleCategory: builder.query<any, string>({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getSubcategories: builder.query<any[], any | void>({
      query: (params) => ({
        url: '/subcategory',
        params: { status: 'active', ...(params || {}) },
      }),
      providesTags: ['Subcategory'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const { 
  useGetCategoriesQuery, 
  useGetSingleCategoryQuery,
  useGetSubcategoriesQuery
} = categoryApiSlice;
