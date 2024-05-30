import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userEmail: "",
    userPassword: "",
  },
  reducers: {
    userEmail(state, action) {
      state.userEmail = action.payload;
    },
    userPassword(state, action) {
      state.userPassword = action.payload;
    },
  },
});

export const { userEmail, userPassword, addLoginData } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
