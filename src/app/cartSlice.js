import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : {},
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload.id;
      const productDetails = action.payload; // assuming product details are in the payload
      if (state.cartItems[itemId]) {
        state.cartItems[itemId].quantity += 1;
      } else {
        state.cartItems[itemId] = { quantity: 1, ...productDetails };
      }
    },
    removeFromCart(state, action) {
      const nextCartItems = Object.keys(state.cartItems)
        .filter((key) => state.cartItems[key].id !== action.payload.id)
        .reduce((acc, key) => ({ ...acc, [key]: state.cartItems[key] }), {});

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(nextCartItems));

      toast.error(`"${action.payload.title}" removed from cart`, {
        position: "top-center",
      });
    },
    decreaseCart(state, action) {
      const itemKey = Object.keys(state.cartItems).find(
        (key) => state.cartItems[key].id === action.payload.id
      );
      if (state.cartItems[itemKey].quantity > 1) {
        state.cartItems[itemKey].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "top-center",
        });
      } else if (state.cartItems[itemKey].quantity === 1) {
        const nextCartItems = Object.keys(state.cartItems).reduce(
          (acc, key) => {
            if (key !== itemKey) {
              acc[key] = state.cartItems[key];
            }
            return acc;
          },
          {}
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "top-center",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error("Cart Cleared", {
        position: "top-center",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      const { total, quantity } = Object.keys(state.cartItems).reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = parseFloat((price * cartQuantity).toFixed(2));
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
    
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, search } =
  cartSlice.actions;

export default cartSlice.reducer;
