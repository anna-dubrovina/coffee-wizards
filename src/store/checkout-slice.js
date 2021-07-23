import { createSlice } from '@reduxjs/toolkit';

const INITIAL_FORM = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  city: '',
  deliveryMethod: '',
  address: '',
  postalCode: '',
  deliveryTime: '',
  paymentMethod: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    formValues: INITIAL_FORM,
    formIsValid: false,
  },
  reducers: {
    setFormValues(state, action) {
      state.formValues = {
        ...state.formValues,
        ...action.payload,
      };
    },
    clearForm(state) {
      state.formValues = INITIAL_FORM;
    },
    setValidity(state, action) {
      state.formIsValid = action.payload;
    }
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;
