import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import EditTransaction from '../../components/Pure/EditTransaction';
import { Transaction } from '../../Interfaces/Transaction.interface';
import { getTransaction } from '../../services/Transaction.services';

const EditTransactionPage = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >(undefined);
  useEffect(() => {
    if (id === undefined) return;
    getTransaction(`${id}`).then((res) => setTransactionToEdit(res));
    console.log(transactionToEdit);
  }, []);
  return (
    <div>
      {transactionToEdit ? (
        <EditTransaction transactionToEdit={transactionToEdit} id={id} />
      ) : null}
    </div>
  );
};
export default EditTransactionPage;
