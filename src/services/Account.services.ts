import axios from 'axios';
import { BiLogInCircle } from 'react-icons/bi';
import {
  Account,
  AllAccountsResponse,
  NewAccountValues,
} from '../Interfaces/Account.interface';

const { VITE_API_URI } = import.meta.env;

export const getAllAccounts = async (): Promise<AllAccountsResponse> => {
  try {
    const { data, status } = await axios.get<AllAccountsResponse>(
      `${VITE_API_URI}/account/all`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('token') || '{}'
          )}`,
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

export const createAccount = async (
  values: NewAccountValues
): Promise<Account> => {
  console.log(values);

  try {
    const { data, status } = await axios.post<Account>(
      `${VITE_API_URI}/account`,
      values,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('token') || '{}'
          )}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('UNEXPECTED ERROR');
    }
  }
};
