import { baseApi } from "./baseApi";

export const marqueeApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarquees: builder.query<any[], void>({
      query: () => ({
        url: "/marquee",
      }),
      providesTags: ["Marquee"],
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const { useGetMarqueesQuery } = marqueeApiSlice;
