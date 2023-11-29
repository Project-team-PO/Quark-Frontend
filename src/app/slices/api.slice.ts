import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5253" });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (_builder) => ({})
})