import { createSlice } from "@reduxjs/toolkit";

type TypeState = {
  user: User;
  token: String | null;
};

type User = {
  roles: "ROLE_ADMIN" | "ROLE_DEVELOPER" | "ROLE_PROJECT_MANAGER" | "";
  id: string;
  firstname: string;
  mail: string;
  lastname: string;
};

const initialState: TypeState = {
  token: null,
  user: {
    roles: "ROLE_PROJECT_MANAGER", //  Project_Manager Admin Developer
    id: "cl5s7fg720000ryk9jlzteabj",
    firstname: "Florian",
    lastname: "Bême",
    mail: "florianbme@gmail.com",
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

export const role = (state: { authSlice: TypeState }) =>
  state.authSlice.user.roles;
export const user = (state: { authSlice: TypeState }) => state.authSlice.user;

export const { AUTHENTICATE_USER_IN_STORE } = authSlice.actions;

export default authSlice.reducer;
