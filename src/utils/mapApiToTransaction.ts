import {
  AllTransactionResponse,
  Transaction,
} from '../Interfaces/Transaction.interface';

export const mapApiToTransaction = (
  apiTransactions: AllTransactionResponse
): Array<Transaction> => {
  return apiTransactions?.map((transaction: Transaction) => {
    const {
      _id,
      value,
      account,
      created_by,
      category,
      comment,
      transaction_date,
      type,
      createdAt,
      updatedAt,
    } = transaction;
    return {
      _id,
      value,
      account,
      created_by,
      category,
      comment,
      transaction_date,
      type,
      createdAt,
      updatedAt,
    };
  });
};
