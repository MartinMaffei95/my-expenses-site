import { useFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useReloadData } from '../../../hooks/useReloadData';
import { AccountsState, UserState } from '../../../Interfaces/Redux.interface';
import {
  PostTransactionValues,
  Transaction,
} from '../../../Interfaces/Transaction.interface';
import {
  editTransaction,
  saveTransaction,
} from '../../../services/Transaction.services';
import { Type_transaction } from '../../../utils/TypeConfig';
import InputField from '../../Forms&Fields/Pure/InputField';
import SelectField from '../../Forms&Fields/Pure/SelectField';

type EditTransactionProps = {
  transactionToEdit: Transaction | undefined;
  id: string | undefined;
};

const EditTransaction = ({ transactionToEdit, id }: EditTransactionProps) => {
  const { user } = useSelector((state: UserState) => state.user);
  const accounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );
  const navigate = useNavigate();
  const { VITE_API_URI } = import.meta.env;
  const initialValues = {
    value: transactionToEdit?.value || 0,
    account: transactionToEdit?.account || '',
    category: transactionToEdit?.category || '',
    type: transactionToEdit?.type || '',
  };

  const validationSchema = yup.object({
    value: yup.number().required(),
    account: yup.string().required(),
    category: yup.string().required(),
    type: yup.string().required(),
  });

  const reloadData = useReloadData();

  const onSubmit = async (): Promise<void> => {
    try {
      if (id === undefined) return;
      await editTransaction(values, id);
      reloadData();
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
  }: FormikProps<PostTransactionValues> = useFormik<PostTransactionValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <div className="pl-2 pr-2">
      <h3 className="title">Editar transaccion</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Monto"
          inputName="value"
          labelClassname="label-style"
          inputClassname={'input-style'}
          type="number"
          value={values.value}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.value && errors.value ? errors.value : null}
        />
        <SelectField
          label="Cuenta"
          inputName="account"
          labelClassname="label-style"
          inputClassname={'input-style'}
          optGroup={accounts}
          value={values.account}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.account && errors.account ? errors.account : null
          }
        />
        <SelectField
          label="Categoria"
          inputName="category"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.category}
          optGroup={user.my_categories}
          haveSubCategory
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.category && errors.category ? errors.category : null
          }
        />
        <SelectField
          label="Tipo de transferencia"
          inputName="type"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.type}
          optGroup={Type_transaction}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
        <button className="btn-input font-bold text-lg mt-2 mb-2" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
