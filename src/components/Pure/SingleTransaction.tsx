import { Transaction } from '../../Interfaces/Transaction.interface';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface TransactionProps {
  transaction: Transaction;
  deleteAction: Function;
}

export const SingleTransaction = ({
  transaction,
  deleteAction,
}: TransactionProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-dominantColor-400 m-2  rounded-xl p-2 pl-3 relative overflow-hidden border-gray-300 border-2">
      <div
        className={`w-2 h-full inset-0 absolute `}
        style={{
          background: `${transaction.account.color}`,
        }}
      ></div>
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="flex justify-between gap-2 text-xl">
          <div onClick={() => navigate(`transaction/${transaction?._id}/edit`)}>
            <BsPencil />
          </div>
          <div>
            <BsFillTrashFill
              onClick={() => {
                deleteAction(true, transaction);
              }}
            />
          </div>
        </div>
        <p>{transaction.account.name}</p>
      </div>
      <span
        className={`${
          transaction.type === 'ADDITION'
            ? 'text-green-600'
            : transaction.type === 'SUBSTRACTION'
            ? 'text-red-600'
            : 'gray'
        } `}
      >
        {`${
          transaction?.type === 'ADDITION'
            ? `$${transaction?.value}`
            : transaction?.type === 'SUBSTRACTION'
            ? `- $${transaction?.value}`
            : `- $${transaction?.value}`
        }`}{' '}
        {transaction?.account?.currency}
      </span>
      <p>{transaction?.category?.name}</p>
      <div className="text-gray-600 text-sm w-full flex justify-end pr-2">
        <span>{transaction.transaction_date}</span> -
        <span>{transaction.created_by.name}</span>
      </div>
    </div>
  );
};
