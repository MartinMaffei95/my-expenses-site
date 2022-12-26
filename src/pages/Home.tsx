import axios from "axios";
import { TransactionContainer } from "../components/Container/TransactionsContainer";
import { getUserData } from "../services/User.services";

const Home = () => {
  getUserData();
  return (
    <div>
      <TransactionContainer />
    </div>
  );
};

export default Home;
