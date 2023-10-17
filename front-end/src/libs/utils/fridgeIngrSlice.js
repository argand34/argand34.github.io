import { createSlice } from "@reduxjs/toolkit";

const fridgeIngrSlice = createSlice({
  name: "fridgeIngr",
  initialState: {
    userIngrData: [],
  },
  reducers: {
    setUserIngrData: (state, action) => {
      state.userIngrData = action.payload;
    },
  },
});

export const { setUserIngrData } = fridgeIngrSlice.actions;

export default fridgeIngrSlice.reducer;
