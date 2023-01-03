import { Transaction } from './Transaction.interface';

export interface Account {
  name: string;
  _id: string;
  description: string;
  balance: number;
  initial_balance: number;
  total_expenses: number;
  total_income: number;
  currency: string;
  type: string;
  tags: string[];
  color: string;
  from: string;
  created_by: string;
  shared_with: string[];
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export type AllAccountsResponse = Array<Account>;

export type NewAccountValues = Pick<
  Account,
  | 'name'
  | 'description'
  | 'balance'
  | 'initial_balance'
  | 'currency'
  | 'type'
  | 'color'
>;

export interface PostNewAccountValues extends NewAccountValues {}
