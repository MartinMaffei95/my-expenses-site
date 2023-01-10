import { useFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useReloadData } from '../../../hooks/useReloadData';
import {
  Account,
  PostNewAccountValues,
} from '../../../Interfaces/Account.interface';
import { AccountsState, UserState } from '../../../Interfaces/Redux.interface';
import {
  PostTransactionValues,
  Transaction,
} from '../../../Interfaces/Transaction.interface';
import { editAccount } from '../../../services/Account.services';
import {
  editTransaction,
  saveTransaction,
} from '../../../services/Transaction.services';
import { Type_transaction } from '../../../utils/TypeConfig';
import ColorPicker from '../../ColorPicker/ColorPicker';
import InputField from '../../Forms&Fields/Pure/InputField';
import SelectField from '../../Forms&Fields/Pure/SelectField';

type EditAccountProps = {
  accountToEdit: Account | undefined;
  id: string | undefined;
};

const EditAccount = ({ accountToEdit, id }: EditAccountProps) => {
  const accounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );
  const { appSettings } = useSelector((state: any) => state.settings);

  const navigate = useNavigate();
  const { VITE_API_URI } = import.meta.env;

  const initialValues = {
    name: accountToEdit?.name || '',
    description: accountToEdit?.description || '',
    balance: accountToEdit?.balance || 0,
    initial_balance: accountToEdit?.initial_balance || 0,
    currency: accountToEdit?.currency || '',
    type: accountToEdit?.type || '',
    color: accountToEdit?.color || '',
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    balance: yup.number().required(),
    initial_balance: yup.number().required(),
    currency: yup.string().required(),
    type: yup.string().required(),
    color: yup.string().required(),
  });

  const reloadData = useReloadData();

  const onSubmit = async (): Promise<void> => {
    try {
      if (id === undefined) return;
      await editAccount(values, id);
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
    setFieldValue,
  }: FormikProps<PostNewAccountValues> = useFormik<PostNewAccountValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <div className="pl-2 pr-2">
      <h3 className="title">Editar cuenta</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre de cuenta"
          inputName="name"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.name && errors.name ? errors.name : null}
        />
        <InputField
          label="Descripcion de la cuenta"
          inputName="description"
          labelClassname="label-style"
          inputClassname={'input-style '}
          value={values.description}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.description && errors.description
              ? errors.description
              : null
          }
        />
        <InputField
          label="Saldo inicial"
          inputName="initial_balance"
          labelClassname="label-style"
          inputClassname={'input-style'}
          type="number"
          value={values.initial_balance}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.initial_balance && errors.initial_balance
              ? errors.initial_balance
              : null
          }
        />
        <SelectField
          label="Moneda"
          inputName="type"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.type}
          optGroup={appSettings?.accountList}
          haveSubCategory
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
        <SelectField
          label="Tipo de cuenta"
          inputName="currency"
          labelClassname="label-style"
          inputClassname={'input-style'}
          optGroup={appSettings?.currencyList}
          value={values.currency}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.currency && errors.currency ? errors.currency : null
          }
        />

        <div>
          <p className="label-style">Color</p>
          <ColorPicker
            name={'color'}
            value={values?.color}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
        </div>
        <button className="btn-input font-bold text-lg mt-2 mb-2" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
