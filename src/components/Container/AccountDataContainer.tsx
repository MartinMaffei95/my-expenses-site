import { Account } from '../../Interfaces/Account.interface';
import { Transaction } from '../../Interfaces/Transaction.interface';
import AccountResume from '../Molecules/AccountResume';

type AccountDataContainerProps = {
  account: Account;
};

const AccountDataContainer = ({ account }: AccountDataContainerProps) => {
  type ResumeTransactionsProps = {
    transactions: Transaction[];
  };
  const ResumeTransactions = ({ transactions }: ResumeTransactionsProps) => {
    return (
      <div>
        {transactions.map((t) => (
          <div>
            {t.value} | {t.category.name} | {t.transaction_date}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div
        className={`flex-col items-center justify-center`}
        style={{ boxShadow: `0 4px 4px .5px ${account.color}` }}
      >
        <h3 className="title">{account.name}</h3>
        <span className="label-style">
          {account.currency} - {account.type}
        </span>
        {account.description ? <p>{account.description}</p> : null}
      </div>
      <div className="label-style">
        <h4 className="subtitle">Resumen</h4>

        <AccountResume
          initial_balance={account.initial_balance}
          total_expenses={account.balance}
          total_income={account.total_income}
          balance={account.total_expenses}
        />
      </div>
      <div>
        <h4 className="subtitle">Transacciones</h4>
        {account.transactions && account.transactions.length > 0 ? (
          <ResumeTransactions transactions={account.transactions} />
        ) : (
          <p className="label-style">No hay movimientos aun</p>
        )}
      </div>
    </div>
  );
};
export default AccountDataContainer;
