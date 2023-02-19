import { Account } from "./Account.interface";
import { User } from "./Auth.interface";
import { Category } from "./Category.interface";

export interface Transaction {
  _id: string;
  value: number;
  account: Account;
  created_by: User;
  category: Category;
  comment: string;
  transaction_date: string;
  type: string;
  from?: string;
  to?: string;
  createdAt: string;
  updatedAt: string;
}

export type AllTransactionResponse = Array<Transaction>;

export type GetTransactionAXIOSResponse = Transaction[];
export type GetTransactionResponse = Transaction;

export type PickedTransactionValues = Pick<Transaction, "value" | "type">;
export interface PostTransactionValues extends PickedTransactionValues {
  account: string | Account;
  category: string | Category;
  transaction_date: string;
  from?: string;
  to?: string;
}
