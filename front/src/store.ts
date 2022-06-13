import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicer/authSlice";

import exempleSlice from "./slicer/exempleSlice";

export default configureStore({
  reducer: {
    exempleSlice: exempleSlice,
    authSlice: authSlice,
  },
});
