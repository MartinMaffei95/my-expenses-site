import { useFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useModal } from '../../../hooks/useModal';
import { useReloadData } from '../../../hooks/useReloadData';
import {
  AccountsState,
  ReduxState,
  UserState,
} from '../../../Interfaces/Redux.interface';
import { PostTransactionValues } from '../../../Interfaces/Transaction.interface';
import { saveTransaction } from '../../../services/Transaction.services';
import { Type_transaction } from '../../../utils/TypeConfig';
import InputField from '../../Forms&Fields/Pure/InputField';
import SelectField from '../../Forms&Fields/Pure/SelectField';
import { normalizeDateOP } from '../../../utils/normalizeDate';
import dayjs from 'dayjs';
import { randomColor } from '../../../utils/randomColor';

const CreateTransaction = () => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const accounts = useSelector((state: ReduxState) => state.accounts.accounts);
  const { VITE_API_URI } = import.meta.env;

  const initialValues: PostTransactionValues = {
    value: 0,
    account: accounts[0]._id || '',
    category: '',
    type: Type_transaction[0]._id || '',
    transaction_date: normalizeDateOP() || '',
  };

  const validationSchema = yup.object({
    value: yup.number().required(),
    account: yup.string().required(),
    category: yup.string().required(),
    type: yup.string().required(),
    transaction_date: yup.string().required(),
  });

  const reloadData = useReloadData();
  const { handleModal } = useModal();

  const onSubmit = async () => {
    try {
      await saveTransaction(values);
      resetForm();
      reloadData();
      handleModal(false, '');
    } catch (err) {
      if (err instanceof Error) {
      } else {
      }
    }
  };

  const {
    resetForm,
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
  console.log();

  useEffect(() => {}, []);
  return (
    <div>
      <h3 className="title">Crear nueva transaccion</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Monto"
          inputName="value"
          type="number"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.value}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.value && errors.value ? errors.value : null}
        />
        <InputField
          label="Fecha"
          inputName="transaction_date"
          type="date"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={normalizeDateOP(
            values.transaction_date,
            'DD/MM/YYYY',
            'YYYY-MM-DD'
          )}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.transaction_date && errors.transaction_date
              ? errors.transaction_date
              : null
          }
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
          optGroup={user?.my_categories}
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
        <button className="btn-input mt-4" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
