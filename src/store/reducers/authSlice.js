import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
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
      console.log(state.currentUser);
      state.currentUser = action.payload;
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
    setAdded(state, action) {
      !state.currentUser.added.includes(action.payload)
        ? (state.currentUser.added = [
            ...state.currentUser.added,
            action.payload,
          ])
        : (state.currentUser.added = state.currentUser.added.filter(
            (id) => id !== action.payload
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
  setAdded,
} = authSlice.actions;
export default authSlice.reducer;
