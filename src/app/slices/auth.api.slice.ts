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
    UpdateProfileEndpoint: builder.mutation({
      query: (data) => ({
        url: "/api/Users/UpdateProfile",
        method: "PUT",
        body: data,
      }),
    }),
    ActivateAccountEndpoint: builder.mutation({
      query: (data) => ({
        url: "/api/Users/Register",
        method: "POST",
        body: data,
      }),
    }),
    AddAnnouncementEndpoint: builder.mutation({
      query: (data) => ({
        url: "/api/Users/AddAnnouncement",
        method: "POST",
        body: data,
      }),
    }),
    GetAnnouncementsEndpoint: builder.mutation({
      query: () => ({
        url: "/api/Announcements/GetAnnouncements",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignInEndpointMutation,
  useUpdateProfileEndpointMutation,
  useActivateAccountEndpointMutation,
  useAddAnnouncementEndpointMutation,
  useGetAnnouncementsEndpointMutation,
} = authApiSlice;
