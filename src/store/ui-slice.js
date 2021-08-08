import { createSlice } from '@reduxjs/toolkit';
import * as vars from '../shared/globalVars';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false,
    modalType: null,
    isLoading: false,
    errorMessage: null,
    isFound: true,
  },
  reducers: {
    modalClose(state) {
      state.isModalOpen = false;
      state.modalType = null;
    },
    openCart(state) {
      state.isModalOpen = true;
      state.modalType = vars.CART;
    },
    openCallbackForm(state) {
      state.isModalOpen = true;
      state.modalType = vars.FORM;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isModalOpen = true;
      state.modalType = vars.ERROR;
      state.errorMessage = action.payload;
    },
    setFound(state, action) {
      state.isFound = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
