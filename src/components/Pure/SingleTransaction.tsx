import { Transaction } from '../../Interfaces/Transaction.interface';

interface TransactionProps {
  transaction: Transaction;
}

export const SingleTransaction = ({ transaction }: TransactionProps) => {
  return (
    <div style={{ border: `solid 1px #9099`, margin: `1rem` }}>
      <p>{transaction.category}</p>
      <p>{transaction.account}</p>
      <span
        style={{
          fontSize: '1.2rem',
          color: `${
            transaction.type === 'ADDITION'
              ? 'green'
              : transaction.type === 'SUBSTRACTION'
              ? 'red'
              : 'gray'
          }`,
        }}
      >
        {transaction.value}
      </span>
      <span>{transaction.transaction_date}</span>
      <span>{transaction.created_by}</span>
    </div>
  );
};
