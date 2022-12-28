import { useEffect } from 'react';
import { TransactionContainer } from '../components/Container/TransactionsContainer';
import { useReloadData } from '../hooks/useReloadData';

const Home = () => {
  return (
    <div>
      <hr />
      <TransactionContainer />
    </div>
  );
};

export default Home;
