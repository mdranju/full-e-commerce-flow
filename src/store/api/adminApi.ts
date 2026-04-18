import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import { API_URL } from "@/src/config/consonants";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL?.replace("/app", "/admin"),
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "AdminProduct",
    "AdminOrder",
    "AdminBanner",
    "AdminMarquee",
    "AdminUser",
    "AdminCategory",
    "AdminSubcategory",
    "AdminSettings",
    "AdminAnalytics",
    "Page",
  ],
  endpoints: (builder) => ({
    // Page Management
    getAllAdminPages: builder.query<any, any>({
      query: () => ({
        url: "/page",
      }),
      providesTags: ["Page"],
    }),
    createAdminPage: builder.mutation<any, any>({
      query: (data) => ({
        url: "/page",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Page"],
    }),
    updateAdminPage: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/page/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Page"],
    }),
    deleteAdminPage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/page/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Page"],
    }),

    // Product Management
    getAllAdminProducts: builder.query<any, any>({
      query: (params) => ({
        url: "/product",
        params,
      }),
      providesTags: ["AdminProduct"],
    }),
    getAdminProductById: builder.query<any, string>({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminProduct", id }],
    }),
    createAdminProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminProduct"],
    }),
    updateAdminProduct: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminProduct", id },
        "AdminProduct",
      ],
    }),

    // Category Management
    getAllAdminCategories: builder.query<any, any>({
      query: (params) => ({
        url: "/category",
        params,
      }),
      providesTags: ["AdminCategory"],
    }),
    createCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminCategory"],
    }),
    updateCategory: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminCategory"],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCategory"],
    }),
    reorderCategories: builder.mutation<any, { id: string; order: number }[]>({
      query: (data) => ({
        url: "/category/reorder",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminCategory"],
    }),

    // User Management
    getAllAdminUsers: builder.query<any, any>({
      query: (params) => ({
        url: "/user",
        params,
      }),
      providesTags: ["AdminUser"],
    }),
    getAdminUserById: builder.query<any, string>({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminUser", id }],
    }),
    toggleAdminUserBlock: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => ["AdminUser", { type: "AdminUser", id }],
    }),

    // Settings (Metadata)
    getAdminSettings: builder.query<any, void>({
      query: () => "/metadata",
      providesTags: ["AdminSettings"],
    }),
    updateAdminSettings: builder.mutation<any, any>({
      query: (data) => ({
        url: "/metadata/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminSettings"],
    }),

    // Order Management
    getAllAdminOrders: builder.query<any, void>({
      query: () => "/order",
      providesTags: ["AdminOrder"],
    }),
    updateOrderStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, ...data }) => ({
        url: `/order/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminOrder"],
    }),
    // Banner Management
    getAllAdminBanners: builder.query<any, void>({
      query: () => "/banner",
      providesTags: ["AdminBanner"],
    }),
    createBanner: builder.mutation<any, any>({
      query: (data) => ({
        url: "/banner/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminBanner"],
    }),
    updateBanner: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/banner/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminBanner"],
    }),
    deleteBanner: builder.mutation<any, string>({
      query: (id) => ({
        url: `/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminBanner"],
    }),
    reorderBanners: builder.mutation<any, { id: string; order: number }[]>({
      query: (data) => ({
        url: "/banner/reorder",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminBanner"],
    }),

    // Marquee Management
    getAllAdminMarquees: builder.query<any, void>({
      query: () => "/marquee",
      providesTags: ["AdminMarquee"],
    }),
    createMarquee: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/marquee/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminMarquee"],
    }),
    updateMarquee: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/marquee/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminMarquee"],
    }),
    deleteMarquee: builder.mutation<any, string>({
      query: (id) => ({
        url: `/marquee/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminMarquee"],
    }),
    reorderMarquees: builder.mutation<any, { id: string; order: number }[]>({
      query: (data) => ({
        url: "/marquee/reorder",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminMarquee"],
    }),

    // Subcategory Management
    getAllAdminSubcategories: builder.query<any, any>({
      query: (params) => ({
        url: "/subcategory",
        params,
      }),
      providesTags: ["AdminSubcategory"],
    }),
    createSubcategory: builder.mutation<any, any>({
      query: (data) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminSubcategory"],
    }),
    updateSubcategory: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/subcategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminSubcategory"],
    }),
    deleteSubcategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminSubcategory"],
    }),
  }),
});

export const {
  useGetAllAdminProductsQuery,
  useGetAdminProductByIdQuery,
  useCreateAdminProductMutation,
  useUpdateAdminProductMutation,
  useGetAllAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoriesMutation,
  useGetAllAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useToggleAdminUserBlockMutation,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useGetAllAdminOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAllAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useReorderBannersMutation,
  useGetAllAdminMarqueesQuery,
  useCreateMarqueeMutation,
  useUpdateMarqueeMutation,
  useDeleteMarqueeMutation,
  useReorderMarqueesMutation,
  useGetAllAdminSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetAllAdminPagesQuery,
  useCreateAdminPageMutation,
  useUpdateAdminPageMutation,
  useDeleteAdminPageMutation,
} = adminApi;
