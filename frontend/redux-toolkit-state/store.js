import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/UserSlice';
import CartReducer from "./slices/CartSlice";
import ProductReducer from "./slices/ProductSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  cart: CartReducer,
  users: UserReducer,
  products: ProductReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;



