import { Account } from './Account.interface';
import { User } from './Auth.interface';
import { Transaction } from './Transaction.interface';

export interface UserState {
  user: {
    user: User;
  };
}

export interface TransactionsState {
  transactions: {
    transactions: Transaction[];
  };
}

export interface AccountsState {
  accounts: {
    accounts: Account[];
  };
}
