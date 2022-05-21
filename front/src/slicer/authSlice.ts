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

export const role = (state: { authSlice: TypeState }) =>
  state.authSlice.user.role;

export default authSlice.reducer;
