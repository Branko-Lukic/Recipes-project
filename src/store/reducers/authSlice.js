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
  },
});
export const { setError, finishLoading, startLoading, setCurrentUser } =
  authSlice.actions;
export default authSlice.reducer;
