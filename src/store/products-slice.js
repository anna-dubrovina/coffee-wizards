import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    subcategoryProds: [],
    categoryProds: [],
    product: {},
    featuredProds: [],
  },
  reducers: {
    getSubcategoryProds(state, action) {
      state.subcategoryProds = action.payload;
    },
    getCategoryProds(state, action) {
      state.categoryProds = action.payload;
    },
    getProduct(state, action) {
      state.product = action.payload;
    },
    getFeaturedProds(state, action) {
      state.featuredProds = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
