import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'cart',
  initialState: { checkedFilters: [], filtersParams: [] },
  reducers: {
    addFilter(state, action) {
      const paramValue = encodeURI(action.payload.filterValue);
      const index = state.checkedFilters.findIndex(
        (item) => item.filterName === action.payload.filterName
      );
      if (index >= 0) {
        if (action.payload.filterName === 'price') {
          state.checkedFilters[index].values = [action.payload.filterValue];
          state.filtersParams.splice(index, 1, {
            paramName: action.payload.filterName,
            paramValue,
          });
        } else {
          state.checkedFilters[index].values.push(action.payload.filterValue);
          state.filtersParams[index].paramValue += `;${paramValue}`;
        }
      } else {
        state.checkedFilters.push({
          filterName: action.payload.filterName,
          values: [action.payload.filterValue],
        });
        state.filtersParams.push({
          paramName: action.payload.filterName,
          paramValue: paramValue,
        });
      }
    },

    deleteFilter(state, action) {
      const paramValue = encodeURI(action.payload.filterValue);
      const updatedParams = state.filtersParams.map((item) => {
        let updatedValue = item.paramValue.replace(`;${paramValue}`, '');
        if (updatedValue === item.paramValue) {
          updatedValue = item.paramValue.replace(paramValue, '');
        }
        if (updatedValue[0] === ';') {
          updatedValue = updatedValue.substring(1);
        }
        item.paramValue = updatedValue;
        return item;
      });
      state.filtersParams = updatedParams.filter(
        (item) => item.paramValue !== ''
      );

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
      state.filtersParams = [];
    },

    setFilters(state, action) {
      for (const item of action.payload) {
        let values = [];
        if (item.paramValue.includes(';')) {
          values = item.paramValue.split(';');
        } else {
          values = [item.paramValue];
        }
        state.checkedFilters.push({
          filterName: item.paramName,
          values: [...values],
        });
      }
      const encodedValues = action.payload.map((item) => {
        const encoded = encodeURI(item.paramValue);
        item.paramValue = encoded;
        return item;
      });
      state.filtersParams = [...encodedValues];
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
