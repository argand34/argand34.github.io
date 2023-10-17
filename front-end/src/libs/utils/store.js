import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// 냉장고 식재료 리듀서
import fridgeReducer from "./fridgeIngrSlice";
// 레이아웃 관련 리듀서
import layoutReducer from "./layoutSlice";

const reducers = combineReducers({
  fridge: fridgeReducer,
  layout: layoutReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
