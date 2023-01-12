import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import AuthFormContainer from '../../components/Auth/Container/AuthFormContainer';
import InputField from '../../components/Forms&Fields/Pure/InputField';
import axios from 'axios';
import { LoginResponse, LoginValues } from '../../Interfaces/Auth.interface';
import { loginUser } from '../../services/Auth.services';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/userSlice';
import { getUserData } from '../../services/User.services';
import { AuthLayout } from './AuthLayout';
import AuthSubmitBtn from '../../components/Auth/authSubmitBtn';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthError from '../../components/Auth/AuthError';
const LoginPage = () => {
  const [isEncrypt, setIsEncrypt] = useState<boolean>(true);
  const [responseError, setResponseError] = useState<string>('');
  const toggleEncrypt = () => {
    setIsEncrypt(!isEncrypt);
  };

  const dispatch = useDispatch();

  const { VITE_API_URI } = import.meta.env;
  const navigate: NavigateFunction = useNavigate();

  const initialValues = {
    username: localStorage.getItem('username') || '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required('Password is required'),
  });

  const onSubmit = async (): Promise<void> => {
    try {
      await loginUser(values);
      const userData = await loginUser(values);
      dispatch(updateUserData(userData));
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        // console.log(err.message, err.name);
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
  }: FormikProps<LoginValues> = useFormik<LoginValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });
  return (
    <AuthLayout>
      {responseError !== '' ? <AuthError errorMsg={responseError} /> : <></>}
      <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Login
      </h3>
      <AuthFormContainer>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <InputField
              placeholder={'Nombre de usuario'}
              labelClassname="sr-only"
              inputClassname={'input-style'}
              label="Nombre de usuario"
              inputName="username"
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
              type={isEncrypt ? 'password' : 'text'}
              value={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              icon={isEncrypt ? <FiEyeOff /> : <FiEye />}
              iconFX={toggleEncrypt}
              iconPosition="right"
              errorMessage={
                touched.password && errors.password ? errors.password : null
              }
            />
          </div>
          {/* <div className="flex items-center justify-center ">
             <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div> 
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Olvidaste tu constraseña?
              </a>
            </div>
          </div> */}
          <div>
            <AuthSubmitBtn btnText="Ingresar" />
          </div>
        </form>
        <div className="flex items-center justify-center ">
          <div className="text-sm">
            <a
              href="/auth/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Aún no tienes cuenta? Creala aqui!
            </a>
          </div>
        </div>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default LoginPage;
