import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
import uiSlice from './ui-slice';
import productsSlice from './products-slice';
import profileSlice from './profile-slice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    ui: uiSlice,
    cart: cartSlice,
    profile: profileSlice,
  },
});
