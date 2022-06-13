import { createSlice } from "@reduxjs/toolkit";

interface TypeState {
  user: User;
}

type User = {
  role: string;
  id: string;
};

const initialState: TypeState = {
  user: {
    role: "product_owner", //dev, product_owner, administrator
    id: "cl3e5wqry0000316kq8jijrvy",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export const role = (state: { authSlice: TypeState }) =>
  state.authSlice.user.role;
export const myId = (state: { authSlice: TypeState }) =>
  state.authSlice.user.id;

export default authSlice.reducer;
