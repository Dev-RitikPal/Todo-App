import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const UserData = createSlice({
  name: "userData",
  initialState: { userData: null },
  reducers: {
    user: (state, action) => {
      return { ...state, userData: action.payload };
    },
  },
});

export const { user } = UserData.actions;

export default UserData.reducer;
