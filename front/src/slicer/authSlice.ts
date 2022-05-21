import { createSlice } from "@reduxjs/toolkit";

interface TypeState {
  user: User;
}

type User = {
  role: string;
};

const initialState: TypeState = {
  user: {
    role: "product_owner",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {},
});

export const {} = authSlice.actions;

export const authSliceState = (state: { appStore: { app: {} } }) => state;

export default authSlice.reducer;
