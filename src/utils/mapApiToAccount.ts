import { Account, AllAccountsResponse } from '../Interfaces/Account.interface';

export const mapApiToAccount = (
  apiTransactions: AllAccountsResponse
): Array<Account> => {
  return apiTransactions?.map((transaction: Account) => {
    const {
      name,
      _id,
      description,
      balance,
      initial_balance,
      total_expenses,
      total_income,
      currency,
      type,
      tags,
      color,
      from,
      created_by,
      shared_with,
      transactions,
      createdAt,
      updatedAt,
    } = transaction;
    return {
      name,
      _id,
      description,
      balance,
      initial_balance,
      total_expenses,
      total_income,
      currency,
      type,
      tags,
      color,
      from,
      created_by,
      shared_with,
      transactions,
      createdAt,
      updatedAt,
    };
  });
};
