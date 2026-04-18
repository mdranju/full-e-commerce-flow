import { adminApi } from "./adminApi";

export const analyticsApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => "/analytics",
      providesTags: ["AdminAnalytics"],
      transformResponse: (res: any) => res.data,
    }),
    getRollingAnalytics: builder.query<any, void>({
      query: () => "/analytics/rolling",
      providesTags: ["AdminAnalytics"],
      transformResponse: (res: any) => res.data,
    }),
    getLifetimeAnalytics: builder.query<any, void>({
      query: () => "/analytics/lifetime",
      providesTags: ["AdminAnalytics"],
      transformResponse: (res: any) => res.data,
    }),
    getFilteredAnalytics: builder.query<any, string>({
      query: (filter) => ({
        url: "/analytics/filtered",
        params: { filter },
      }),
      providesTags: ["AdminAnalytics"],
      transformResponse: (res: any) => res.data,
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRollingAnalyticsQuery,
  useGetLifetimeAnalyticsQuery,
  useGetFilteredAnalyticsQuery,
} = analyticsApi;
