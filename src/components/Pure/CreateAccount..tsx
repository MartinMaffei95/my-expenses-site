import { useFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useReloadData } from '../../hooks/useReloadData';
import { NewAccountValues } from '../../Interfaces/Account.interface';
import { AccountsState, UserState } from '../../Interfaces/Redux.interface';
import { createAccount } from '../../services/Account.services';
import { Type_transaction } from '../../utils/TypeConfig';
import ColorPicker from '../ColorPicker/ColorPicker';
import InputField from './InputField';
import SelectField from './SelectField';

const CreateAccount = () => {
  const { appSettings } = useSelector((state: any) => state.settings);
  const accounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );
  const { VITE_API_URI } = import.meta.env;

  const initialValues: NewAccountValues = {
    name: '',
    description: '',
    balance: 0,
    initial_balance: 0,
    currency:
      (appSettings?.currencyList && appSettings?.currencyList[0]?._id) || '',
    type: (appSettings?.accountList && appSettings?.accountList[0]?._id) || '',
    color: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    initial_balance: yup.number(),
    currency: yup.string().required(),
    type: yup.string().required(),
    color: yup.string().required(),
  });

  const reloadData = useReloadData();

  const testSubmit = (e: any) => {
    e.preventDefault();
    values.balance = values.initial_balance;

    console.log(values);
  };
  const onSubmit = async () => {
    try {
      values.balance = values.initial_balance;
      await createAccount(values);
      // resetForm();
      // reloadData();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unexpected error', err);
      }
    } finally {
      console.log('aaa');
      // if (handleclose) handleclose();
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
    setFieldValue,
  }: FormikProps<NewAccountValues> = useFormik<NewAccountValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <div>
      <h3>Crear nueva cuenta</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre"
          inputName="name"
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.name && errors.name ? errors.name : null}
        />
        <InputField
          label="Descripcion de la cuenta"
          inputName="description"
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
          value={values.type}
          optGroup={appSettings?.accountList}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
        <SelectField
          label="Tipo de cuenta"
          inputName="currency"
          value={values.currency}
          optGroup={appSettings?.currencyList}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.currency && errors.currency ? errors.currency : null
          }
        />

        <ColorPicker
          name={'color'}
          value={values?.color}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CreateAccount;
