import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Account } from '../../Interfaces/Account.interface';
import { AccountsState } from '../../Interfaces/Redux.interface';
import { mapApiToAccount } from '../../utils/mapApiToAccount';
import SingleAccount from '../Pure/SingleAccount';

const AccountsContainer = () => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);

  const allAccounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );

  useEffect(() => {
    if (allAccounts?.length <= 0) return;
    const trax = mapApiToAccount(allAccounts);
    setAccounts(trax);
  }, [allAccounts]);

  return (
    <div>
      Todas mis cuentas llenas de goldddd
      <div>
        {accounts && accounts.length <= 0 ? (
          <p> No hay cuentas para mostrar</p>
        ) : (
          accounts?.map((a) => <SingleAccount key={a._id} account={a} />)
        )}
      </div>
    </div>
  );
};

export default AccountsContainer;
