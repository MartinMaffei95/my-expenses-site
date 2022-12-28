import { createSlice } from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
  },
  reducers: {
    updateTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { updateTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
