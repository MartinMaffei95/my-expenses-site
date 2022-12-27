export interface Transaction {
  _id: string;
  value: number;
  account: string;
  created_by: string;
  category: string;
  comment: string;
  transaction_date: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export type AllTransactionResponse = Array<Transaction>;

export type PostTransactionValues = Pick<
  Transaction,
  'value' | 'account' | 'category' | 'type'
>;
