import { baseApi } from './baseApi';

export const pageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPages: builder.query({
      query: () => ({
        url: '/page',
        method: 'GET',
      }),
      providesTags: ['Page'],
    }),
    getPageBySlug: builder.query({
      query: (slug) => ({
        url: `/page/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Page'],
    }),
  }),
});

export const {
  useGetAllPagesQuery,
  useGetPageBySlugQuery,
} = pageApi;
