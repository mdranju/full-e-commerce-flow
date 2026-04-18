import { baseApi } from './baseApi';

export const generalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<any, any>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    submitComplaint: builder.mutation<any, any>({
      query: (data) => ({
        url: '/complaint',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    applyAffiliate: builder.mutation<any, any>({
      query: (data) => ({
        url: '/affiliate',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useSubmitComplaintMutation,
  useApplyAffiliateMutation,
} = generalApi;
