import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || {},
  cartTotalQuantity: JSON.parse(localStorage.getItem('cartTotalQuantity')) || 0,
  cartTotalAmount: JSON.parse(localStorage.getItem('cartTotalAmount')) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload.id;
      const productDetails = action.payload; 
      if (state.cartItems[itemId]) {
        state.cartItems[itemId].quantity += 1;
        toast.info(`🛒 ${productDetails.title} Increase the quantity`, {
          position: "top-center",
        });
     
      } else {
        state.cartItems[itemId] = { quantity: 1, ...productDetails };
        toast.success(`🛒 ${productDetails.title} added to cart`, {
          position: "top-center",
        });
      }
    
      // Recalculate totals
      state.cartTotalQuantity = Object.values(state.cartItems).reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.cartTotalAmount = Object.values(state.cartItems).reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    
      // Round the total amount to two decimal places
      state.cartTotalAmount = parseFloat(state.cartTotalAmount.toFixed(2));

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('cartTotalQuantity', JSON.stringify(state.cartTotalQuantity));
      localStorage.setItem('cartTotalAmount', JSON.stringify(state.cartTotalAmount));
    
   
    },
    removeFromCart(state, action) {
      const nextCartItems = Object.keys(state.cartItems)
        .filter((key) => state.cartItems[key].id !== action.payload.id)
        .reduce((acc, key) => ({ ...acc, [key]: state.cartItems[key] }), {});

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(nextCartItems));

      toast.error(`"🛒 ${action.payload.title}" removed from cart`, {
        position: "top-center",
      });
    },
    decreaseCart(state, action) {
      const itemKey = Object.keys(state.cartItems).find(
        (key) => state.cartItems[key].id === action.payload.id
      );
      
      if (state.cartItems[itemKey].quantity > 1) {
        state.cartItems[itemKey].quantity -= 1;
      } else {
        delete state.cartItems[itemKey];
      }
    
      // Update totals
      const { total, quantity } = Object.values(state.cartItems).reduce(
        (cartTotal, cartItem) => {
          cartTotal.total += cartItem.price * cartItem.quantity;
          cartTotal.quantity += cartItem.quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      toast.info(`"🛒 ${action.payload.title}" Decreased Quantity`, {
        position: "top-center",
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = {};
     
      toast.error(`"🛒 Cart Cleared`, {
        position: "top-center",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
    getTotals(state, action) {
      const { total, quantity } = Object.values(state.cartItems).reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
    
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      localStorage.setItem('cartTotalQuantity', JSON.stringify(state.cartTotalQuantity));
      localStorage.setItem('cartTotalAmount', JSON.stringify(state.cartTotalAmount));
    },
    search(state, action) {
      const searchTerm = action.payload.toLowerCase();
      const filtered = Object.keys(state.cartItems).reduce((acc, key) => {
        const item = state.cartItems[key];
        if (item.title.toLowerCase().includes(searchTerm)) {
          acc[key] = item;
        }
        return acc;
      }, {});

      state.filteredCartItems = filtered;
    }

  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, search,cartTotalAmount, cartTotalQuantity, } =
  cartSlice.actions;

export default cartSlice.reducer;
