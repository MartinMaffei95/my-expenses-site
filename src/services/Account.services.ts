import axios from 'axios';
import { BiLogInCircle } from 'react-icons/bi';
import {
  Account,
  AllAccountsResponse,
  NewAccountValues,
  PostNewAccountValues,
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

export const getAccount = async (account_id: string): Promise<Account> => {
  try {
    const { data, status } = await axios.get<Account>(
      `${VITE_API_URI}/account/${account_id}`,
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
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('UNEXPECTED ERROR');
    }
  }
};

export const editAccount = async (
  values: PostNewAccountValues,
  account_id: string
) => {
  try {
    const { data, status } = await axios.put<Account>(
      `${VITE_API_URI}/account/${account_id}`,
      values,
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
