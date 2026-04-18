import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Priority: Redux state > LocalStorage
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Product",
    "Category",
    "Order",
    "Banner",
    "Wishlist",
    "Cart",
    "Marquee",
    "Analytics",
    "Address",
    "Subcategory",
    "Page",
  ],
  endpoints: () => ({}),
});
