import { createSlice } from '@reduxjs/toolkit';

const INITIAL_CONTACTS = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
};

const profileSlice = createSlice({
  name: 'modal',
  initialState: {
    isAuth: false,
    userId: null,
    userContacts: INITIAL_CONTACTS,
    userAddresses: [],
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.userId = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.userId = null;
      state.userContacts = INITIAL_CONTACTS;
      state.userAddresses = [];
    },
    getUserContacts(state, action) {
      state.userContacts = action.payload;
    },
    getUserAddresses(state, action) {
      state.userAddresses = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
