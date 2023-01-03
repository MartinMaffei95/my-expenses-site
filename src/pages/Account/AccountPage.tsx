import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountDataContainer from '../../components/Container/AccountDataContainer';
import AccountData from '../../components/Container/AccountDataContainer';
import { Account } from '../../Interfaces/Account.interface';
import { getAccount } from '../../services/Account.services';

const AccountPage = () => {
  const [account, setAccount] = useState<Account>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getAccount(id).then((res) => setAccount(res));
  }, [id]);

  return (
    <div>{account ? <AccountDataContainer account={account} /> : null}</div>
  );
};

export default AccountPage;
