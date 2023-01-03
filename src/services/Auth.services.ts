import axios from 'axios';
import {
  LoginResponse,
  LoginValues,
  RegisterResponse,
  RegisterValues,
} from '../Interfaces/Auth.interface';

const { VITE_API_URI } = import.meta.env;

export const registerUser = async (values: RegisterValues) => {
  try {
    const { data, status } = await axios.post<RegisterResponse>(
      `${VITE_API_URI}/auth/register`,
      {
        name: values.name,
        username: values.username,
        password: values.password,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('UNEXPECTED ERROR');
    }
  }
};

export const loginUser = async (
  values: LoginValues
): Promise<LoginResponse | Error> => {
  try {
    const { data, status } = await axios.post<LoginResponse>(
      `${VITE_API_URI}/auth/login`,
      {
        username: values.username,
        password: values.password,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const token = JSON.stringify(data?.token);
    const id = JSON.stringify(data?.user?._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('UNEXPECTED ERROR');
    }
  }
};
