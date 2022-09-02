import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {
    submit: (store, { payload }) => {
      const updatedData = { ...store.formData, ...payload };
      console.log(updatedData);
      store.formData = updatedData;
    },
  },
});

export const { submit } = formSlice.actions;

export default formSlice.reducer;
