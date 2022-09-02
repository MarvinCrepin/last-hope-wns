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
    roles: "",
    id: "",
    firstname: "",
    lastname: "",
    mail: "",
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
    UPDATE_USER_IN_STORE: (state, action) => {
      console.log(state)
      state.user = { ...action.payload.user };
    },
    LOGOUT_USER: (state) => {
      state.user = {
        roles: "",
        id: "",
        firstname: "",
        lastname: "",
        mail: "",
      };
      state.token = null;
    },
  },
});

export const role = (state: { authSlice: TypeState }) =>
  state.authSlice.user.roles;
export const user = (state: { authSlice: TypeState }) => state.authSlice.user;

export const { AUTHENTICATE_USER_IN_STORE, LOGOUT_USER, UPDATE_USER_IN_STORE } = authSlice.actions;

export default authSlice.reducer;
