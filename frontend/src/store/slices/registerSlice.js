import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    regName: "",
    regEmail: "",
    regPassword: "",
    regConfirmPassword: "",
  },
  reducers: {
    registerName(state, action) {
      state.regName = action.payload;
    },
    registerEmail(state, action) {
      state.regEmail = action.payload;
    },

    registerPassword(state, action) {
      state.regPassword = action.payload;
    },

    registerConfirmPassword(state, action) {
      state.regConfirmPassword = action.payload;
    },
  },
});

export const {
  registerName,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
