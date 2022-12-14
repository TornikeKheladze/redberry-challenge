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
export const createLaptop = createAsyncThunk(
  "laptop/createLaptop",
  async (formValues) => {
    const response = laptops.post(
      "/laptop/create",
      { ...formValues, token: "7e1b5dc582a55b9bf29e4b7916dd6e90" },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);
export const fetchLaptops = createAsyncThunk(
  "laptop/fetchLaptops",
  async () => {
    const response = await laptops.get(
      "/laptops?token=7e1b5dc582a55b9bf29e4b7916dd6e90"
    );
    return response.data;
  }
);
export const fetchSingleLaptop = createAsyncThunk(
  "laptop/fetchSingleLaptop",
  async (id) => {
    const response = await laptops.get(
      `/laptop/${id}?token=7e1b5dc582a55b9bf29e4b7916dd6e90`
    );
    return response.data;
  }
);

const initialState = {
  teams: [],
  brands: [],
  cpus: [],
  positions: [],
  laptops: [],
  singleLaptop: {},
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
    [fetchLaptops.fulfilled]: (store, { payload }) => {
      store.laptops = payload.data;
    },
    [fetchSingleLaptop.fulfilled]: (store, { payload }) => {
      store.singleLaptop = payload.data;
    },
  },
});

export default laptopSlice.reducer;
