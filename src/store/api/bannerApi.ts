import { baseApi } from './baseApi';

export const bannerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<any[], 'hero' | 'cta' | 'poster' | void>({
      query: (type) => ({
        url: '/banner',
        params: { status: 'active', ...(type ? { type } : {}) },
      }),
      providesTags: ['Banner'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const { useGetBannersQuery } = bannerApiSlice;
