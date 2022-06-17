import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [{   select: 'test' }]
export const selectedValueSlice: any = createSlice({
    name: 'selectedValue',
    initialState,
    reducers: {
      updateSelectedValue: (state, action) => {
        state.push(action.payload);
        return state;
      },
    },
  })
export const selectValue = (state: { selectedValueSlice: any }) =>
  state.selectedValueSlice.select;


export default selectedValueSlice.reducer;
