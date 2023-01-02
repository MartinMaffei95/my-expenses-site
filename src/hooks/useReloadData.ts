import { useDispatch } from 'react-redux';
import { updateAccounts } from '../redux/accountsSlice';
import { loadSettings } from '../redux/appSettings';
import { updateTransactions } from '../redux/transactionsSlice';
import { updateUserData } from '../redux/userSlice';
import { getAllAccounts } from '../services/Account.services';
import { getAllTransactions } from '../services/Transaction.services';
import { getUserData } from '../services/User.services';

export const useReloadData = () => {
  const dispatch = useDispatch();

  return () => {
    getUserData().then((res) => {
      dispatch(updateUserData(res));
      dispatch(loadSettings(res));
    });
    getAllTransactions().then((res) => {
      dispatch(updateTransactions(res));
    });
    getAllAccounts().then((res) => {
      dispatch(updateAccounts(res));
    });
  };
};
