// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBrandOptions,
  fetchCategory,
  fetchMaterialOptions,
  fetchSubCategory,
  fetchSubSubCategory,
} from "./masterDataAPI";

export const initialState = {
  brandOptions: [],
  materialOptions: [],
  categories: [],
  subCategories: [],
  subSubCategories: {},
  loadingCategories: false,
  loadingSubCategories: false,
  loadingSubSubCategories: false,
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
      .addCase(fetchCategory.pending, (state, action) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loadingCategories = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loadingCategories = false;
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
      })
      .addCase(fetchSubSubCategory.pending, (state, action) => {
        state.loadingSubSubCategories = true;
      })
      .addCase(fetchSubSubCategory.fulfilled, (state, action) => {
        const { subCategoryId, data } = action.payload;

        state.subSubCategories[subCategoryId] = data;
        state.loadingSubSubCategories = false;
      })
      .addCase(fetchSubSubCategory.rejected, (state, action) => {
        state.loadingSubSubCategories = false;
      });
  },
});

export const masterDataReducer = masterDataSlice.reducer;
