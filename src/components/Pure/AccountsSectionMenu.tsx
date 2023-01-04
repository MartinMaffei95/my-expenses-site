import { useEffect, useState } from 'react';
import { Account } from '../../Interfaces/Account.interface';
import CategorizedAccountsContainer from '../Container/CategorizedAccountsContainer';
import { BsCashCoin, BsBank, BsCreditCard } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { AccountsState } from '../../Interfaces/Redux.interface';
export type AccountsSectionMenuProps = {
  accounts: Array<Account>;
};
const AccountsSectionMenu = () => {
  const [cashAccounts, setCashAccounts] = useState<Account[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
  const [creditCardAccounts, setCreditCardAccounts] = useState<Account[]>([]);

  const allAccounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );

  const categorizeAccounts = (accounts: Account[]) => {
    console.log(accounts, accounts.length);
    if (accounts.length <= 0) return;
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      switch (account.type) {
        case 'CASH':
          let cashArr = [...cashAccounts];
          cashArr.push(account);
          setCashAccounts(cashArr);
          break;
        case 'BANK_ACCOUNT':
          let bankArr = [...bankAccounts];
          bankArr.push(account);
          setBankAccounts(bankArr);
          break;
        case 'CREDIT_CARD':
          let creditArr = [...creditCardAccounts];
          creditArr.push(account);
          setCreditCardAccounts(creditArr);
          break;

        default:
          break;
      }
    }
    console.log(allAccounts, cashAccounts, bankAccounts, creditCardAccounts);
  };

  useEffect(() => {
    return () => {
      categorizeAccounts(allAccounts);
    };
  }, [allAccounts]);
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
