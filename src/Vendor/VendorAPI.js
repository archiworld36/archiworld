// src/api/authAPI.js
import axios from "axios";
import BASEURL from "../BaseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVendorById = createAsyncThunk(
    "vendor/fetchVendorById",
    async (userId) => {
      const response = await axios.get(
        `${BASEURL}/api/get-user/${userId}`,
      );
      return response.data.users;
    },
  );