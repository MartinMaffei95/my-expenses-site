import { Account } from '../../../Interfaces/Account.interface';

export type AccountProps = {
  account: Account;
};
const SingleAccount = ({ account }: AccountProps) => {
  const basic_color = 'red';
  return (
    <div style={{ border: `${account.color || basic_color} 1px solid` }}>
      <div>
        <p>{account.name}</p>
        <p>{account.description}</p>
      </div>
      <div>
        <span>{account.type}</span> - <span>{account.currency}</span>
      </div>
      <div>
        <p>
          Monto: <span>{account.balance}</span>
        </p>
      </div>
    </div>
  );
};

export default SingleAccount;
