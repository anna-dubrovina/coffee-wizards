import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'cart',
  initialState: { checkedFilters: [] },
  reducers: {
    addFilter(state, action) {
      const index = state.checkedFilters.findIndex(
        (item) => item.filterName === action.payload.filterName
      );
      if (index >= 0) {
        state.checkedFilters[index].values.push(action.payload.filterValue);
      } else {
        state.checkedFilters.push({
          filterName: action.payload.filterName,
          values: [action.payload.filterValue],
        });
      }
    },

    deleteFilter(state, action) {
      state.checkedFilters.map((item) => {
        const updatedValues = item.values.filter(
          (value) => value !== action.payload.filterValue
        );
        item.values = updatedValues;
        if (updatedValues === 0) {
          return null;
        }
        return item;
      });
      const updatedFilters = state.checkedFilters.filter(
        (item) => item.values.length > 0
      );
      state.checkedFilters = updatedFilters;
    },

    clearFilters(state) {
      state.checkedFilters = [];
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
