import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { masterDataReducer } from "./Products/Components/masterDataSlice";
// STEP 1: Combine all slice reducers
const appReducer = combineReducers({
  masterData: masterDataReducer
});


// STEP 4: Configure store
const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
