import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const initialState = {
  cartItems: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};


const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
        };

      } else {
        state.cartItems.push(action.payload);
      }
      Cookies.set('cart', JSON.stringify(state.cartItems));

    },
   
    removeFromCart(state, action) {
        const data = state.cartItems.filter((cart) => cart._id !== action.payload);
        Cookies.set('cart', JSON.stringify(data));
        state.cartItems = data;
        return state;
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      Cookies.set('cart', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  CartSlice.actions;

const { reducer } = CartSlice;
export default reducer;