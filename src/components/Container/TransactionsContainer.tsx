import { useEffect, useState } from 'react';
import { Transaction } from '../../Interfaces/Transaction.interface';
import { getAllTransactions } from '../../services/Transaction.services';
import { mapApiToTransaction } from '../../utils/mapApiToTransaction';
import { SingleTransaction } from '../Pure/SingleTransaction';

export const TransactionContainer = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  useEffect(() => {
    getAllTransactions().then((allT) => {
      if (allT?.length <= 0) return;
      const trax = mapApiToTransaction(allT);
      setTransactions(trax);
    });
  }, []);
  return (
    <div>
      <div>
        {transactions && transactions.length <= 0 ? (
          <p> No hay transferencias creadas</p>
        ) : (
          transactions?.map((t) => <SingleTransaction transaction={t} />)
        )}
      </div>
    </div>
  );
};
