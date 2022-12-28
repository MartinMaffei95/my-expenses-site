import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import AuthFormContainer from '../../components/Container/AuthFormContainer';
import InputField from '../../components/Pure/InputField';
import axios from 'axios';
import { LoginResponse, LoginValues } from '../../Interfaces/Auth.interface';
import { loginUser } from '../../services/Auth.services';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/userSlice';
import { getUserData } from '../../services/User.services';
const LoginPage = () => {
  const dispatch = useDispatch();

  const { VITE_API_URI } = import.meta.env;
  const navigate: NavigateFunction = useNavigate();

  const initialValues = {
    username: '',
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
  }: FormikProps<LoginValues> = useFormik<LoginValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });
  return (
    <div>
      <h3>Login</h3>
      <AuthFormContainer>
        <form onSubmit={handleSubmit}>
          <InputField
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
            inputName="password"
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              touched.password && errors.password ? errors.password : null
            }
          />

          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </AuthFormContainer>
    </div>
  );
};

export default LoginPage;
