import { useFormik, FormikProps } from 'formik';
import { useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import AuthError from '../../components/Auth/AuthError';
import AuthFormContainer from '../../components/Auth/Container/AuthFormContainer';
import AuthSubmitBtn from '../../components/Auth/authSubmitBtn';
import InputField from '../../components/Forms&Fields/Pure/InputField';
import { RegisterValues } from '../../Interfaces/Auth.interface';
import { registerUser } from '../../services/Auth.services';
import { AuthLayout } from './AuthLayout';

const RegisterPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const [responseError, setResponseError] = useState<string>('');

  const initialValues = {
    name: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required('Este campo es requerido'),
    username: yup.string().required(),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
  });

  const onSubmit = async (): Promise<void> => {
    try {
      await registerUser(values);
      localStorage.setItem('username', values.username);
      navigate('/auth/login');
    } catch (err) {
      if (err instanceof Error) {
        setResponseError(err.message);
      } else {
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
  }: FormikProps<RegisterValues> = useFormik<RegisterValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });
  return (
    <AuthLayout>
      {responseError !== '' ? <AuthError errorMsg={responseError} /> : <></>}

      <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Register
      </h3>
      <AuthFormContainer>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <InputField
              label="Nombre"
              placeholder="Nombre"
              inputName="name"
              labelClassname="sr-only"
              inputClassname={'input-style'}
              value={values.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={touched.name && errors.name ? errors.name : null}
            />

            <InputField
              label="Nombre de usuario"
              placeholder="Nombre de usuario"
              inputName="username"
              labelClassname="sr-only"
              inputClassname={'input-style'}
              value={values.username}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={
                touched.username && errors.username ? errors.username : null
              }
            />

            {/* PASS */}

            <InputField
              label="Ingresá tu contraseña"
              placeholder="Ingresá tu contraseña"
              inputName="password"
              labelClassname="sr-only"
              inputClassname={'input-style'}
              value={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={
                touched.password && errors.password ? errors.password : null
              }
            />
            <InputField
              label="Ingresá nuevamente tu contraseña"
              placeholder="Ingresá nuevamente tu contraseña"
              inputName="passwordConfirmation"
              labelClassname="sr-only"
              inputClassname={'input-style'}
              value={values.passwordConfirmation}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={
                touched.passwordConfirmation && errors.passwordConfirmation
                  ? errors.passwordConfirmation
                  : null
              }
            />
          </div>

          <div>
            <AuthSubmitBtn btnText="Crear" />
          </div>
          <div className="flex items-center justify-center ">
            <div className="text-sm">
              <Link
                to="/auth/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Ya tienes una cuenta? Accede aqui
              </Link>
            </div>
          </div>
        </form>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default RegisterPage;
