import { Account } from './Account.interface';
import { Category } from './Category.interface';

export interface Token {
  token: string;
}
export interface User {
  _id: number;
  username: string;
  password: string;
  name: string;
  accounts: Account[];
  my_categories: Category[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  token: Token;
  user: User;
}

export interface RegisterValues {
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginValues {
  username: string;
  password: string;
}

export interface LoginResponse extends RegisterResponse {}
