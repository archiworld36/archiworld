// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductById,
  fetchFeaturedProducts,
  fetchSuggestedProducts,
  fetchProducts,
} from "./ProductsAPI";

export const productInitialState = {
  total: 0,
  products: [],
  featuredProducts: [],
  productById: {},
  suggestedProduct: [],
  loading: false,
  loadingProductDetailsFetch: false,
  loadingSuggestedProductFetch: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.payload === "REQUEST_CANCELLED") return;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loadingProductDetailsFetch = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingProductDetailsFetch = false;
        state.productById = action.payload; // Set the product by id
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingProductDetailsFetch = false;
      })

      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload; // Set the product by id
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSuggestedProducts.pending, (state) => {
        state.loadingSuggestedProductFetch = true;
      })
      .addCase(fetchSuggestedProducts.fulfilled, (state, action) => {
        state.loadingSuggestedProductFetch = false;
        state.suggestedProduct = action.payload; // Set the product by id
      })
      .addCase(fetchSuggestedProducts.rejected, (state, action) => {
        state.loadingSuggestedProductFetch = false;
      });
  },
});

export const productsReducer = productSlice.reducer;
