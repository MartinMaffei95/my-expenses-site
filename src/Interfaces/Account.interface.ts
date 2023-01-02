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
  transactions: string[];
  createdAt: string;
  updatedAt: string;
}

export type AllAccountsResponse = Array<Account>;
