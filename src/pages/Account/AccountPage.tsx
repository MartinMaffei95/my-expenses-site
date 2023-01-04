import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AccountDataContainer from '../../components/Container/AccountDataContainer';
import AccountData from '../../components/Container/AccountDataContainer';
import { Account } from '../../Interfaces/Account.interface';
import { AccountsState } from '../../Interfaces/Redux.interface';
import { getAccount } from '../../services/Account.services';

const AccountPage = () => {
  // const [account, setAccount] = useState<Account>();
  const { id } = useParams();
  const account = useSelector((state: AccountsState) =>
    state.accounts.accounts.find((a) => a._id === id)
  );

  return (
    <div>{account ? <AccountDataContainer account={account} /> : null}</div>
  );
};

export default AccountPage;
