import { useDispatch } from 'react-redux';
import { updateAccounts } from '../redux/accountsSlice';
import { updateTransactions } from '../redux/transactionsSlice';
import { updateUserData } from '../redux/userSlice';
import { getAllAccounts } from '../services/Account.services';
import { getAllTransactions } from '../services/Transaction.services';
import { getUserData } from '../services/User.services';

export const reloadData = () => {
  const dispatch = useDispatch();

  return () => {
    getUserData().then((res) => {
      dispatch(updateUserData(res));
    });
    getAllTransactions().then((res) => {
      dispatch(updateTransactions(res));
    });
    getAllAccounts().then((res) => {
      dispatch(updateAccounts(res));
    });
  };
};
