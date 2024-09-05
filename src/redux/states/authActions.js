import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

import "react-toastify/dist/ReactToastify.css";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/register/", userData, {
        withCredentials: true,
      });
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      alert(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (dataObj, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/token/", dataObj.data, {
        withCredentials: true,
      });
      if (!response.data.success) {
        dataObj.callback(response);
      } else {
        dataObj.callback(response);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (callback, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/logout/");
      callback(res);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (data) => {
    const token = data.token;
    const response = await axiosInstance.post("/auth/google-signin/", {
      token,
    });
    data.callback();
    return response.data;
  }
);

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const response = await axiosInstance.get("auth/user/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", file);

      const response = await axiosInstance.post(
        "auth/update-profile-picture/",
        formData
      );

      if (response.data && response.data.profile_picture) {
        return response.data.profile_picture;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (dataObj, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("auth/user/", dataObj.data);
      dataObj.callback();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
