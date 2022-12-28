import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AccountsState,
  TransactionsState,
} from '../../Interfaces/Redux.interface';
import { Transaction } from '../../Interfaces/Transaction.interface';
import { mapApiToTransaction } from '../../utils/mapApiToTransaction';
import BasicModal, { ModalProps } from '../Pure/ModalComponent';
import { SingleTransaction } from '../Pure/SingleTransaction';

export const TransactionContainer = ({
  toggleOpenTransaction,
  open,
}: ModalProps) => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  const allTransactions = useSelector(
    (state: TransactionsState) => state.transactions.transactions
  );

  useEffect(() => {
    if (allTransactions?.length <= 0) return;
    const trax = mapApiToTransaction(allTransactions);
    setTransactions(trax);
  }, [allTransactions]);
  return (
    <div>
      <div>
        {transactions && transactions.length <= 0 ? (
          <p> No hay transferencias creadas</p>
        ) : (
          transactions?.map((t) => <SingleTransaction transaction={t} />)
        )}
      </div>
      {/* <div>
        <button onClick={toggleOpenTransaction(true)}>Crear</button>
      </div> */}
    </div>
  );
};
