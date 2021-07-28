import { createSlice } from '@reduxjs/toolkit';

const getTotalAmount = (items) => {
  const amount = items.reduce((prevValue, curValue) => {
    return prevValue + curValue.totalItemPrice;
  }, 0);
  return amount.toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, totalAmount: 0 },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
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

      state.totalAmount = getTotalAmount(state.items);
    },
    removeItem(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalItemPrice =
          existingItem.totalItemPrice - existingItem.price;
      }
      state.totalAmount = getTotalAmount(state.items);
    },
    deleteItem(state, action) {
      const selectedItem = action.payload;
      state.totalQuantity = state.totalQuantity - selectedItem.quantity;
      state.items = state.items.filter((item) => item.id !== selectedItem.id);
      state.totalAmount = getTotalAmount(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
