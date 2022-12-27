import { useEffect, useState } from 'react';
import { Account } from '../../Interfaces/Account.interface';
import { getAllAccounts } from '../../services/Account.services';
import { mapApiToAccount } from '../../utils/mapApiToAccount';
import SingleAccount from '../Pure/SingleAccount';

const AccountsContainer = () => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  useEffect(() => {
    getAllAccounts()
      .then((allAccounts) => {
        if (allAccounts?.length <= 0) return;
        const trax = mapApiToAccount(allAccounts);
        setAccounts(trax);
      })
      .catch(console.log);
  }, []);

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
