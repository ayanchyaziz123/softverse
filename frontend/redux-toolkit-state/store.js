import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/UserSlice';
import CartReducer from "./slices/CartSlice";
import ProductReducer from "./slices/ProductSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  cart: CartReducer,
  users: userReducer,
  products: ProductReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;



