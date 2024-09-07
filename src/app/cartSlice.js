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
/* The `addToCart` function is a reducer function defined within a Redux Toolkit
slice. This function is responsible for adding items to the shopping cart state in the Redux store. */
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
  /* The `removeFromCart` function is a reducer function defined within a Redux Toolkit slice. This
  function is responsible for removing an item from the shopping cart state in the Redux store. */
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
 /* The `decreaseCart` function is a reducer function within a Redux Toolkit slice that handles
 decreasing the quantity of an item in the shopping cart. Here's a breakdown of what it does: */
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
/* The `clearCart` function is a reducer function within a Redux Toolkit slice that is responsible for
clearing all items from the shopping cart state in the Redux store. */
    clearCart(state, action) {
      state.cartItems = {};
     
      toast.error(`"🛒 Cart Cleared`, {
        position: "top-center",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
/* The `getTotals` function within the Redux Toolkit slice is responsible for calculating the total
quantity and total amount of all items in the shopping cart. Here's a breakdown of what it does: */
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
/**
 * The `search` function filters items in the cart based on a search term and updates the
 * `filteredCartItems` in the state.
 * @param state - The `state` parameter in the `search` function likely contains information about the
 * current state of the application, such as the items in the shopping cart. It may include properties
 * like `cartItems` which is an object containing the items in the cart, and `filteredCartItems` which
 * will store
 * @param action - The `action` parameter in the `search` function represents an object that contains
 * information about the action being performed. It typically includes a `payload` property that holds
 * the search term used to filter items in the shopping cart.
 */
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
