import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductList, Product } from '../../types';
import { apiUrl } from './index';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['ProductList'],
  endpoints: (builder) => ({
    getAll: builder.query<ProductList<Product>, null | undefined>({
      query: () => `search/product`,
      providesTags: [{ type: 'ProductList', id: 'LIST' }],
    }),
    update: builder.mutation<Product, Product>({
      query(product) {
        return {
          url: `product/${product.id}`,
          method: `PUT`,
          body: product,
        };
      },
      invalidatesTags: [{ type: 'ProductList', id: 'LIST' }],
    }),
    delete: builder.mutation<Product, Product>({
      query(product) {
        return {
          url: `product/${product.id}`,
          method: `DELETE`,
          body: product,
        };
      },
      invalidatesTags: [{ type: 'ProductList', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = productApi;
