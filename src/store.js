import { configureStore } from "@reduxjs/toolkit";
import laptopsReducer from "./features/laptopsSlice";

export const store = configureStore({
  reducer: {
    generals: laptopsReducer,
  },
});
