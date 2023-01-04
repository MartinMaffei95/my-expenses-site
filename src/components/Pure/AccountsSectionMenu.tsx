import { useEffect, useState } from 'react';
import { Account } from '../../Interfaces/Account.interface';
import CategorizedAccountsContainer from '../Container/CategorizedAccountsContainer';
import { BsCashCoin, BsBank, BsCreditCard } from 'react-icons/bs';
export type AccountsSectionMenuProps = {
  accounts: Array<Account>;
};
const AccountsSectionMenu = ({ accounts }: AccountsSectionMenuProps) => {
  const [allAccounts, setAllAccounts] = useState<Account[]>(accounts);
  const [cashAccounts, setCashAccounts] = useState<Account[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
  const [creditCardAccounts, setCreditCardAccounts] = useState<Account[]>([]);
  console.log(accounts);
  const categorizeAccounts = (accounts: Account[]) => {
    if (accounts.length <= 0) return;
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      switch (account.type) {
        case 'CASH':
          setCashAccounts((prevState) => [...prevState, account]);
          break;
        case 'BANK_ACCOUNT':
          setBankAccounts((prevState) => [...prevState, account]);
          break;
        case 'CREDIT_CARD':
          setCreditCardAccounts((prevState) => [...prevState, account]);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    return () => {
      categorizeAccounts(allAccounts);
    };
  }, [accounts]);
  return (
    <>
      {cashAccounts ? (
        <CategorizedAccountsContainer
          categoryIcon={<BsCashCoin />}
          accounts={cashAccounts}
          accordionText="Cuentas en efectivo"
        />
      ) : null}
      {bankAccounts ? (
        <CategorizedAccountsContainer
          categoryIcon={<BsBank />}
          accounts={bankAccounts}
          accordionText="Cuentas bancarias"
        />
      ) : null}
      {creditCardAccounts ? (
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
