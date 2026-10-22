import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice that manages the Paradise Nursery shopping cart.
 * Each cart item has the shape: { name, image, description, cost, quantity }.
 */
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Plants currently in the cart
  },
  reducers: {
    // Add a plant to the cart; if it already exists, bump its quantity.
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },

    // Remove a plant type from the cart entirely (payload: plant name).
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Set the quantity of a plant (payload: { name, quantity }).
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Selector helpers
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

const cartReducer = CartSlice.reducer;
export default cartReducer;
