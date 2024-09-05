import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import {
  login,
  logout,
  googleSignIn,
  getUserInfo,
  uploadProfileImage,
  updateUser,
} from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    googleUser: false,
    isAuthorized: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    authUser: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setUserFromGoogle: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleSignIn.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Login successful!";
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.successMessage = "Login successful!";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.successMessage = "Logout successful!";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload?.data;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "updated";
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.profile_picture = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearMessages, setUserFromGoogle, authUser } = authSlice.actions;
export default authSlice.reducer;
