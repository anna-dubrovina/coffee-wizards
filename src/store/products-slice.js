import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    subcategoryProducts: [],
    categoryProducts: [],
    product: {},
    featuredProducts: [],
  },
  reducers: {
    getSubcategoryProducts(state, action) {
      state.subcategoryProducts = action.payload;
    },
    getCategoryProducts(state, action) {
      state.categoryProducts = action.payload;
    },
    getProduct(state, action) {
      state.product = action.payload;
    },
    getFeaturedProducts(state, action) {
      state.featuredProducts = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
