import { Transaction } from "../../Interfaces/Transaction.interface";

interface TransactionProps {
  transaction: Transaction;
}

export const SingleTransaction = ({ transaction }: TransactionProps) => {
  return (
    <div>
      <p>{transaction.category}</p>
    </div>
  );
};
