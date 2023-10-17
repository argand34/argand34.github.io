import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isLoading: false,
    isAuth: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setLoading, setAuth } = layoutSlice.actions;

export default layoutSlice.reducer;
