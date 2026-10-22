import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

/** Central Redux store for Paradise Nursery. */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
