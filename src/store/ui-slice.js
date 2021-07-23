import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false,
    modalType: '',
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    modalClose(state) {
      state.isModalOpen = false;
    },
    openCart(state) {
      state.isModalOpen = true;
      state.modalType = 'cart';
    },
    openCallbackForm(state) {
      state.isModalOpen = true;
      state.modalType = 'form';
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isModalOpen = true;
      state.modalType = 'error';
      state.errorMessage = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
