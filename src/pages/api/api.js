// src/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://easy-school-uniform-ant.cyclic.app/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getProduct: builder.query({
      query: () => "/seller/product"
    }),
    getDetail: builder.query({
      query: (productId) => `/seller/product/${productId}`
    }),
    uploadProduct: builder.mutation({
      query: (body) => ({
        url: "/seller/product",
        method: "POST",
        body: body,
      }),
      headers: (headers) => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          headers.set('Content-Type', 'multipart/form-data');
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/seller/product/${id}`,
        method: 'PUT',
        body: data,
      }),
      headers: (headers) => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          headers.set('Content-Type', 'multipart/form-data');
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/seller/product/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Menggunakan token dari local storage
        },
      }),
    })
  }),
});

export const {
  useLoginUserMutation,
  useGetProductQuery,
  useUploadProductMutation,
  useGetDetailQuery,
  useRegisterUserMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = api;

export default api;
