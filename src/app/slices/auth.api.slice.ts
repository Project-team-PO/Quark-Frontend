import { apiSlice } from "./api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    SignInEndpoint: builder.mutation({
      query: (data) => ({
        url: "/api/Login/Login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInEndpointMutation } = authApiSlice;
