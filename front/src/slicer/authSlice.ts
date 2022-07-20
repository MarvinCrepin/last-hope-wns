import { createSlice } from "@reduxjs/toolkit";

type TypeState = {
  user: IUser | null;
  token: String | null;
};

interface IUser {
  roles: "ROLE_ADMIN" | "ROLE_DEVELOPER" | "ROLE_PROJECT_MANAGER" | "";
  id: string;
}

const initialState: TypeState = {
  token: null,
  user: {
    roles: "",
    id: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    AUTHENTICATE_USER_IN_STORE: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
    },
  },
});

export const { AUTHENTICATE_USER_IN_STORE } = authSlice.actions;

export const role = (state: { authSlice: TypeState }) => {
  if (state.authSlice.user) return state.authSlice.user.roles;
  return "";
};

export const myId = (state: { authSlice: TypeState }) => {
  if (state.authSlice.user) return state.authSlice.user.id;
  return null;
};

export default authSlice.reducer;
