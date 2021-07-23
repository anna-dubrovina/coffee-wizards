import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, changed: false },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      state.changed = true;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.price === newItem.price
      );
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          img: newItem.img,
          category: newItem.category,
          size: newItem.size,
          quantity: 1,
          totalItemPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalItemPrice =
          existingItem.totalItemPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalItemPrice =
          existingItem.totalItemPrice - existingItem.price;
      }
    },
    deleteItem(state, action) {
      const selectedItem = action.payload;
      state.totalQuantity = state.totalQuantity - selectedItem.quantity;
      state.changed = true;

      state.items = state.items.filter((item) => item.id !== selectedItem.id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
