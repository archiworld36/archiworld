import axios from "axios";
import BASEURL from "../../BaseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrandOptions = createAsyncThunk(
  "masterData/fetchBrandOptions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/get-brands`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch brand options.",
      );
    }
  },
);

export const fetchMaterialOptions = createAsyncThunk(
  "masterData/fetchMaterialOptions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/get-materials`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch material options.",
      );
    }
  },
);

export const fetchCategory = createAsyncThunk(
  "masterData/fetchCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/get-categories`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories.",
      );
    }
  },
);

export const fetchSubCategory = createAsyncThunk(
  "masterData/fetchSubCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/get-subCategories/${categoryId}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch sub-categories.",
      );
    }
  },
);

export const fetchSubSubCategory = createAsyncThunk(
  "masterData/fetchSubSubCategory",
  async (subCategoryId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/get-sub-subCategories/${subCategoryId}`,
      );
      return {
        subCategoryId,
        data: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch sub-sub--categories.",
      );
    }
  },
);
