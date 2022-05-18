import { configureStore } from "@reduxjs/toolkit";

import exempleSlice from "./slicer/exempleSlice";

export default configureStore({
  reducer: {
    exempleSlice: exempleSlice,
  },
});
