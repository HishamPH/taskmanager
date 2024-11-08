import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInterceptor";

let initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const logoutUser = createAsyncThunk("userAuth/logoutUser", async () => {
  try {
    axiosInstance.post("/user/logout");
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.otpToken = null;
        localStorage.removeItem("userInfo");
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
