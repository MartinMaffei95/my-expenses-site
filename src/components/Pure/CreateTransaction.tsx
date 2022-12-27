import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { PostTransactionValues } from '../../Interfaces/Transaction.interface';
import InputField from './InputField';
import SelectField from './SelectField';

const CreateTransaction = () => {
  // {
  //     "value": 0,
  //     "account": "string",
  //     "category": "string",
  //     "type": "string"
  //   }

  const { VITE_API_URI } = import.meta.env;

  const initialValues = {
    value: 0,
    account: '',
    category: '',
    type: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required('Password is required'),
  });

  const onSubmit = (): void => {};

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

  return (
    <div>
      <form>
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
          value={values.account}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.account && errors.account ? errors.account : null
          }
        />

        <InputField
          label="Categoria"
          inputName="category"
          value={values.category}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            touched.category && errors.category ? errors.category : null
          }
        />

        <InputField
          label="Nombre de usuario"
          inputName="type"
          value={values.type}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.type && errors.type ? errors.type : null}
        />
      </form>
    </div>
  );
};

export default CreateTransaction;
