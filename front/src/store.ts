import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicer/authSlice";

import exempleSlice from "./slicer/exempleSlice";
import selectSlice from "./slicer/selectSlice";

export default configureStore({
  reducer: {
    exempleSlice: exempleSlice,
    authSlice: authSlice,
    selectSlice: selectSlice
  },
});
