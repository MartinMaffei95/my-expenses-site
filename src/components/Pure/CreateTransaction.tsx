import { useFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useReloadData } from '../../hooks/useReloadData';
import { AccountsState, UserState } from '../../Interfaces/Redux.interface';
import { PostTransactionValues } from '../../Interfaces/Transaction.interface';
import { saveTransaction } from '../../services/Transaction.services';
import { Type_transaction } from '../../utils/TypeConfig';
import InputField from './InputField';
import { ModalProps } from './ModalComponent';
import SelectField from './SelectField';

const CreateTransaction = ({ open, toggleOpenTransaction }: ModalProps) => {
  const { user } = useSelector((state: UserState) => state.user);
  const accounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );
  const { VITE_API_URI } = import.meta.env;

  const initialValues = {
    value: 0,
    account: accounts[0]._id || '',
    category: user.categories[0]._id || '',
    type: Type_transaction[0]._id || '',
  };

  const validationSchema = yup.object({
    value: yup.number().required(),
    account: yup.string().required(),
    category: yup.string().required(),
    type: yup.string().required(),
  });

  const reloadData = useReloadData();

  const onSubmit = async (): Promise<void> => {
    console.log(values);
    try {
      await saveTransaction(values);
      reloadData();
      toggleOpenTransaction(false);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unexpected error', err);
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
    <div>
      <h3>Crear nueva transaccion</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Monto"
          inputName="value"
          type="number"
          value={values.value}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.value && errors.value ? errors.value : null}
        />
        <SelectField
          label="Cuenta"
          inputName="account"
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
          value={values.category}
          optGroup={user.categories}
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
          value={values.type}
          optGroup={Type_transaction}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CreateTransaction;
