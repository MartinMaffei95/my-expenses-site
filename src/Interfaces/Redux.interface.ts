import { Account } from './Account.interface';
import { User } from './Auth.interface';
import { Transaction } from './Transaction.interface';

export type ReduxState = {
  user: UserState;
  transactions: TransactionsState;
  accounts: AccountsState;
  // settings: settingsSlice;
  app: AppState;
};

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
export interface AppState {
  loading: boolean;
  modal: {
    open: boolean;
    action: string;
  };
}
