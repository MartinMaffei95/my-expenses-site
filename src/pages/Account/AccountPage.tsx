import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AccountDataContainer from '../../components/Accounts/Container/AccountDataContainer';
import { ReduxState } from '../../Interfaces/Redux.interface';

const AccountPage = () => {
  // const [account, setAccount] = useState<Account>();
  const { id } = useParams();
  const account = useSelector((state: ReduxState) =>
    state.accounts.accounts.find((a) => a._id === id)
  );
  return (
    <div>{account ? <AccountDataContainer account={account} /> : null}</div>
  );
};

export default AccountPage;
