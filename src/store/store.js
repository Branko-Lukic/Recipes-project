import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./reducers/recipesSlice";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesSlice,
    auth: authSlice,
  },
});
