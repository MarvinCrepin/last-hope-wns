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
    role: "Developer", // CF: RoleList
    id: "2018",
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
