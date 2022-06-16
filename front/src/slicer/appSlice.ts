import { createSlice } from "@reduxjs/toolkit";

interface AppSlice {
  loading: boolean;
}

const initialState: AppSlice = {
  loading: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    TOOGLE_LOAD: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const loading = (state: { appSlice: AppSlice }) =>
  state.appSlice.loading;

export const { TOOGLE_LOAD } = appSlice.actions;

export default appSlice.reducer;
