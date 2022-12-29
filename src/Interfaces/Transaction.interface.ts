import { Category } from '../components/Pure/SelectField';
import { Account } from './Account.interface';
import { User } from './Auth.interface';

export interface Transaction {
  _id: string;
  value: number;
  account: Account;
  created_by: User;
  category: Category;
  comment: string;
  transaction_date: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export type AllTransactionResponse = Array<Transaction>;

export type GetTransactionAXIOSResponse = Transaction[];
export type GetTransactionResponse = Transaction;

export type PickedTransactionValues = Pick<Transaction, 'value' | 'type'>;
export interface PostTransactionValues extends PickedTransactionValues {
  account: string | Account;
  category: string | Category;
}
