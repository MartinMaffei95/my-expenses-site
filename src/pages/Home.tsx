
import AccountsContainer from '../components/Container/AccountsContainer';
import { TransactionContainer } from '../components/Container/TransactionsContainer';

const Home = () => {
  getUserData();
  return (
    <div>
      <AccountsContainer />
      <hr />
      <TransactionContainer />
    </div>
  );
};

export default Home;
