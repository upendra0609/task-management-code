import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL, setAuthHeader } from "../api/api";


export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/auth/signin`, userData);
    localStorage.setItem("jwt", data.token);
    console.log("Login success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
});


export const register = createAsyncThunk("auth/register", async (userData) => {
  console.log("register", userData);
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/auth/signup`, userData);
    localStorage.setItem("jwt", data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.clear("jwt");
    console.log("Logout success");
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
  setAuthHeader(jwt, api);
  try {
    const { data } = await api.get(`/api/v1/user/profile`);
    return data;
  } catch (error) {
    console.log("getUserProfile", error);
    throw Error(error.response.data.error);
  }
});


export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
  setAuthHeader(jwt, api);
  try {
    const { data } = await api.get(`/api/v1/user/all`);
    console.log("Get user list success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
});






const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    jwt: null,
    users: []
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.loading = false;
        state.jwt = action.payload.token;
        // console.log("login success", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.jwt = action.payload.token;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUserList.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(logout.fulfilled, (state, action) => {
        state.user = null,
          state.loggedIn = false,
          state.loading = false,
          state.error = null,
          state.jwt = null,
          state.users = []
      })

  }
});

export default authSlice.reducer