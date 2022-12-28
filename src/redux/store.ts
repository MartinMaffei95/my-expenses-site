import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './accountsSlice';
import transactionsSlice from './transactionsSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    transactions: transactionsSlice,
    accounts: accountsSlice,
  },
});
