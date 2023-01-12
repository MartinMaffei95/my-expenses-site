import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useState } from 'react';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Account } from '../../../Interfaces/Account.interface';
import { Transaction } from '../../../Interfaces/Transaction.interface';
import AccountResume from '../Molecules/AccountResume';
import AlertDialog from '../../LayOut/Pure/AlertDialog';
import { TransactionCharts } from '../../Charts/TransactionCharts';

export type AccountDataContainerProps = {
  account: Account;
};

const AccountDataContainer = ({ account }: AccountDataContainerProps) => {
  type ResumeTransactionsProps = {
    transactions: Transaction[];
  };
  const navigate = useNavigate();

  const ResumeTransactions = ({ transactions }: ResumeTransactionsProps) => {
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
    console.log(account);
    return (
      <div>
        <ToastContainer />
        <AlertDialog
          toggleAlert={toggleAlert}
          open={alertOpen}
          transaction={transactionObj}
          notificateToast={notificateToast}
        />

        <Accordion>
          <AccordionSummary>
            <h4 className="subtitle w-full">Transacciones</h4>
          </AccordionSummary>

          <AccordionDetails>
            {transactions.map((t) => (
              <div className="label-style border-b-2 flex justify-between">
                <span className="basis-1/4"> {t?.category?.name}</span>
                <span
                  className={`${
                    t?.type === 'SUBSTRACTION'
                      ? 'text-red-500'
                      : t?.type === 'ADDITION' && 'text-green-500'
                  } basis-1/4 `}
                >
                  $ {t?.value}
                </span>
                <span className="basis-1/4"> {t?.transaction_date}</span>
                <div className="flex justify-between gap-2 text-xl">
                  <div onClick={() => navigate(`/transaction/${t?._id}/edit`)}>
                    <BsPencil />
                  </div>
                  <div>
                    <BsFillTrashFill
                      onClick={() => {
                        toggleAlert(true, t);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  return (
    <div className="p-2 label-style flex flex-col gap-4 ">
      <div
        className={`flex flex-col items-center justify-center shadow-lg relative`}
      >
        <button
          className="absolute top-2 right-2 text-3xl text-gray-500"
          onClick={() => navigate(`edit`)}
        >
          <MdSettings />
        </button>
        <h3 className="title">{account.name}</h3>
        <span>
          {account.currency} - {account.type}
        </span>
        {account.description ? <p>{account.description}</p> : null}
      </div>
      <div className="flex w-full justify-center">
        <TransactionCharts account={account} />
      </div>
      <div className="label-style shadow-lg">
        <h4 className="subtitle">Resumen</h4>

        <AccountResume
          initial_balance={account.initial_balance}
          total_expenses={account.total_expenses}
          total_income={account.total_income}
          balance={account.balance}
        />
      </div>
      <div className="label-style shadow-lg">
        {account.transactions && account.transactions.length > 0 ? (
          <ResumeTransactions transactions={account.transactions} />
        ) : (
          <p className="label-style flex justify-center items-center bg-">
            No hay movimientos aun
          </p>
        )}
      </div>
    </div>
  );
};
export default AccountDataContainer;
