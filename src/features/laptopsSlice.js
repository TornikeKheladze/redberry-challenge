import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import laptops from "../apis/laptops";

export const fetchTeams = createAsyncThunk("laptop/fetchTeams", async () => {
  const response = await laptops.get("/teams");
  return response.data;
});
export const fetchBrands = createAsyncThunk("laptop/fetchBrands", async () => {
  const response = await laptops.get("/brands");
  return response.data;
});
export const fetchCpus = createAsyncThunk("laptop/fetchCpus", async () => {
  const response = await laptops.get("/cpus");
  return response.data;
});
export const fetchPositions = createAsyncThunk(
  "laptop/fetchPositions",
  async () => {
    const response = await laptops.get("/positions");
    return response.data;
  }
);

const initialState = {
  teams: [],
  brands: [],
  cpus: [],
  positions: [],
};
const laptopSlice = createSlice({
  name: "laptop",
  initialState,
  extraReducers: {
    [fetchTeams.fulfilled]: (store, { payload }) => {
      store.teams = payload.data;
    },
    [fetchBrands.fulfilled]: (store, { payload }) => {
      store.brands = payload.data;
    },
    [fetchCpus.fulfilled]: (store, { payload }) => {
      store.cpus = payload.data;
    },
    [fetchPositions.fulfilled]: (store, { payload }) => {
      store.positions = payload.data;
    },
  },
});

export default laptopSlice.reducer;
