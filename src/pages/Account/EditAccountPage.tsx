import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditAccount from '../../components/Accounts/Pure/EditAccount';
import { AccountsState, ReduxState } from '../../Interfaces/Redux.interface';

const EditAccountPage = () => {
  const { id } = useParams();
  const account = useSelector((state: ReduxState) =>
    state.accounts.accounts.find((a) => a._id === id)
  );

  return (
    <div>
      {account ? <EditAccount accountToEdit={account} id={id} /> : null}
    </div>
  );
};
export default EditAccountPage;
