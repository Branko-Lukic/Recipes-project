import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./reducers/recipesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesSlice,
  },
});

