import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    storeUserData(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = "";
      state.user = null;
    },
  },

  // extraReducers(builder) {
  //   builder.addCase("");
  // },
});

export const { storeUserData, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
