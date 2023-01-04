import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Account } from '../Interfaces/Account.interface';
import { AccountsState } from '../Interfaces/Redux.interface';

const useCategorize = () => {
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
    return () => categorizeAccounts(allAccounts);
  }, [allAccounts]);

  return { cashAccounts, bankAccounts, creditCardAccounts };
};

export default useCategorize;
