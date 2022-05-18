import { createSlice } from "@reduxjs/toolkit";

interface TypeState {
  exempleSate: string;
}

const initialState: TypeState = {
  exempleSate: "test",
};

export const exempleSlice = createSlice({
  name: "exempleSlice",
  initialState,

  reducers: {
    modifyExemple: (state, action) => {
      state.exempleSate = action.payload;
    },
  },
});

export const { modifyExemple } = exempleSlice.actions;

export const exempleSliceState = (state: { appStore: { app: {} } }) => state;

export default exempleSlice.reducer;
