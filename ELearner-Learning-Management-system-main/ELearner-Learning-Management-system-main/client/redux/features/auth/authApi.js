import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";




export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    register: builder.mutation({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistration({
            token: result.data.token,
          }))
        } catch (error) {
          console.log(error);
        }
      }
    }),


    activation: builder.mutation({
      query: ({ activation_Code, activation_Token }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_Code,
          activation_Token
        },
        credentials: 'include'
      }),
    }),


    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password
        },
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({
            token: result.data.accessToken,
            user: result.data.user
          }))
        } catch (error) {
          console.log(error);
        }
      }
    }),


    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar
        },
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({
            token: result.data.accessToken,
            user: result.data.user
          }))
        } catch (error) {
          console.log(error);
        }
      }
    }),

    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {

          dispatch(userLoggedOut())
        } catch (error) {
          console.log(error);
        }
      }
    }),



  })
});


export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutQuery } = authApi;