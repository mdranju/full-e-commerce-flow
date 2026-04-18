import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateProfile: builder.mutation<any, { name?: string; address?: string }>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getAddresses: builder.query<any[], void>({
      query: () => '/address',
      providesTags: ['Address'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    createAddress: builder.mutation<any, any>({
      query: (data) => ({
        url: '/address',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Address'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateAddress: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/address/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Address'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    deleteAddress: builder.mutation<any, string>({
      query: (id) => ({
        url: `/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
    setDefaultAddress: builder.mutation<any, string>({
      query: (id) => ({
        url: `/address/${id}/default`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: ['Address'],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = userApi;
