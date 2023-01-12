import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ReduxState,
  TransactionsState,
} from '../../../Interfaces/Redux.interface';
import { Transaction } from '../../../Interfaces/Transaction.interface';
import { mapApiToTransaction } from '../../../utils/mapApiToTransaction';
import AlertDialog from '../../LayOut/Pure/AlertDialog';
import { SingleTransaction } from '../Pure/SingleTransaction';
// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TransactionContainer = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const allTransactions = useSelector(
    (state: ReduxState) => state.transactions.transactions
  );

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [transactionObj, setTransactionObj] = useState<
    Transaction | undefined
  >();

  const notificateToast = (type: string, text: string) => {
    switch (type) {
      case 'ERROR':
        return toast.error(text);

      case 'SUCCESS':
        return toast.success(text);
      default:
        return toast.info(text);
    }
  };
  const toggleAlert = (state: boolean, transac?: Transaction) => {
    if (transac) setTransactionObj(transac);
    setAlertOpen(state);
  };

  useEffect(() => {
    if (allTransactions?.length <= 0) return setTransactions([]);
    const trax = mapApiToTransaction(allTransactions);
    setTransactions(trax);
  }, [allTransactions]);
  return (
    <div>
      <ToastContainer />
      <AlertDialog
        toggleAlert={toggleAlert}
        open={alertOpen}
        transaction={transactionObj}
        notificateToast={notificateToast}
      />

      <div>
        {transactions && transactions.length <= 0 ? (
          <p> No hay transferencias creadas</p>
        ) : (
          transactions?.map((t) => (
            <SingleTransaction
              key={t._id}
              transaction={t}
              deleteAction={toggleAlert}
            />
          ))
        )}
      </div>
      {/* <div>
        <button onClick={toggleOpenTransaction(true)}>Crear</button>
      </div> */}
    </div>
  );
};
