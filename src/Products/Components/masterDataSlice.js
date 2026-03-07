// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBrandOptions,
  fetchCategory,
  fetchMaterialOptions,
  fetchSubCategory,
} from "./masterDataAPI";

export const initialState = {
  brandOptions: [],
  materialOptions: [],
  categories: [],
  subCategories: [],
  loadingSubCategories: false,
};

const masterDataSlice = createSlice({
  name: "masterData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandOptions.fulfilled, (state, action) => {
        state.brandOptions = action.payload;
      })
      .addCase(fetchMaterialOptions.fulfilled, (state, action) => {
        state.materialOptions = action.payload;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSubCategory.pending, (state, action) => {
        state.loadingSubCategories = true;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.subCategories = action.payload;
        state.loadingSubCategories = false;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loadingSubCategories = false;
      });
  },
});

export const masterDataReducer = masterDataSlice.reducer;
