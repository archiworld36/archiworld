import { createSlice } from "@reduxjs/toolkit";
import { fetchVendorById } from "./VendorAPI";

export const vendorInitialState = {
  vendorById: [],
  loadingVendorDetailsFetch: false,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState: vendorInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login related actions
    builder

      .addCase(fetchVendorById.pending, (state) => {
        state.loadingVendorDetailsFetch = true;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loadingVendorDetailsFetch = false;
        state.vendorById = action.payload; // Set the list of users
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loadingVendorDetailsFetch = false;
      });
  },
});

export const vendorReducer = vendorSlice.reducer;
