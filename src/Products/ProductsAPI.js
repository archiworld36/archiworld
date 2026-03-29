import axios from "axios";
import BASEURL from "../BaseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

let cancelToken;
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      page = 1,
      limit = 24,
      search = "",
      sortBy = "",
      locations,
      subCategories,
      subSubCategories,
      brands,
      materials,
      colors,
      minPrice,
      maxPrice,
      minLength,
      maxLength,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    },
    thunkAPI,
  ) => {
    try {
      if (cancelToken) {
        cancelToken.cancel("New request initiated, cancelling previous one");
      }
      cancelToken = axios.CancelToken.source();

      const body = {
        page,
        limit,
        search,
        sortBy,
        locations,
        subCategories,
        subSubCategories,
        brands,
        materials,
        colors,
        minPrice,
        maxPrice,
        minLength,
        maxLength,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
      };
      const response = await axios.post(`${BASEURL}/api/products`, body, {
        cancelToken: cancelToken.token,
      });

      return {
        products: response.data.products,
        total: response.data.total,
      };
    } catch (error) {
      // 🚀 Ignore cancelled requests
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue("REQUEST_CANCELLED");
      }

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products.",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/get-product-details/${productId}`,
      );
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details",
      );
    }
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  "product/fetchFeaturedProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/get-featured-products/`);
      return response.data.featuredProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured products",
      );
    }
  },
);

export const fetchSuggestedProducts = createAsyncThunk(
  "product/fetchSuggestedProducts",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/suggested-products/${productId}`,
      );
      return response.data.suggestedProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch suggested products",
      );
    }
  },
);
