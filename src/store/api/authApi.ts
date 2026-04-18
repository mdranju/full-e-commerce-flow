import { baseApi } from './baseApi';
import { logout } from '../slices/authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    register: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    forgotPassword: builder.mutation<any, string>({
      query: (email) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: { email },
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    verifyEmail: builder.mutation<any, { email: string; otp: string }>({
      query: (payload) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
