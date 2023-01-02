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

  const onSubmit = async () => {
    try {
      values.balance = values.initial_balance;
      await createAccount(values);
      resetForm();
      reloadData();
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
    <div className="pl-2 pr-2">
      <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Crear nueva cuenta
      </h3>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre"
          labelClassname="label-style"
          inputName="name"
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
          inputClassname={'input-style'}
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
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
        <SelectField
          label="Tipo de cuenta"
          inputName="currency"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.currency}
          optGroup={appSettings?.currencyList}
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

export default CreateAccount;
