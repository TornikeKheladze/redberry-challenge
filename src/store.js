import { configureStore } from "@reduxjs/toolkit";
import laptopsReducer from "./features/laptopsSlice";
import formData from "./features/formSlice";

export const store = configureStore({
  reducer: {
    generals: laptopsReducer,
    formData,
  },
});
