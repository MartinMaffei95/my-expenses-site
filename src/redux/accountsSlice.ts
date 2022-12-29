import { createSlice } from '@reduxjs/toolkit';

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
  },
  reducers: {
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { updateAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
