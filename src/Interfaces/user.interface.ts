import { Account } from './Account.interface';

export interface User {
  name: string;
  description: string;
  balance: number;
  currency: string;
  accounts: Account[];
  type: string;
  tags: string[];
  color: string;
  from: string;
  shared_with: string[];
  transactions: string[];
  createdAt: string;
  updatedAt: string;
}

export type UserResponse = {
  user: User;
  token: string;
};
