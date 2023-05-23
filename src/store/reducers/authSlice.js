import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
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
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
    setFavourites(state, action) {
      !state.currentUser.favourites.includes(action.payload)
        ? (state.currentUser.favourites = [
            ...state.currentUser.favourites,
            action.payload,
          ])
        : (state.currentUser.favourites = state.currentUser.favourites.filter(
            (fav) => fav !== action.payload
          ));
    },
  },
});
export const {
  setError,
  finishLoading,
  startLoading,
  setCurrentUser,
  setFavourites,
} = authSlice.actions;
export default authSlice.reducer;
