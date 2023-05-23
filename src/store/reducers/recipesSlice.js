import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterParams: {},
  searchParam: "",
  filtered: [],
  selected: {},
  loading: false,
  error: "",
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    filterRecipes(state, action) {
      state.filtered = action.payload;
    },
    addSelected(state, action) {
      state.selected = action.payload;
    },
    setFilterParams(state, action) {
      state.filterParams = action.payload;
    },
    setSearchParam(state, action) {
      state.searchParam = action.payload;
    },
    setTimesFavoured(state, action) {
      action.payload === "INCREASE"
        ? (state.selected.timesFavoured += 1)
        : (state.selected.timesFavoured -= 1);
    },
  },
});
export const {
  filterRecipes,
  setError,
  finishLoading,
  startLoading,
  addSelected,
  setFilterParams,
  setSearchParam,
  setTimesFavoured,
} = recipesSlice.actions;
export default recipesSlice.reducer;
