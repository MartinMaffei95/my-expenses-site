import { BsCashCoin, BsBank, BsCreditCard } from 'react-icons/bs';
import useCategorize from '../../../hooks/useCategorize';
import { Account } from '../../../Interfaces/Account.interface';
import CategorizedAccountsContainer from '../Container/CategorizedAccountsContainer';

export type AccountsSectionMenuProps = {
  accounts: Array<Account>;
};
const AccountsSectionMenu = () => {
  const { cashAccounts, bankAccounts, creditCardAccounts } = useCategorize();

  return (
    <>
      {cashAccounts && cashAccounts.length > 0 ? (
        <CategorizedAccountsContainer
          categoryIcon={<BsCashCoin />}
          accounts={cashAccounts}
          accordionText="Cuentas en efectivo"
        />
      ) : null}
      {bankAccounts && bankAccounts.length > 0 ? (
        <CategorizedAccountsContainer
          categoryIcon={<BsBank />}
          accounts={bankAccounts}
          accordionText="Cuentas bancarias"
        />
      ) : null}
      {creditCardAccounts && creditCardAccounts.length > 0 ? (
        <CategorizedAccountsContainer
          categoryIcon={<BsCreditCard />}
          accounts={creditCardAccounts}
          accordionText="Tarjeta de credito"
        />
      ) : null}
    </>
  );
};

export default AccountsSectionMenu;
