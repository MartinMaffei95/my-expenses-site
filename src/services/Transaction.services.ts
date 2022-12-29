import axios from 'axios';
import { Params } from 'react-router-dom';
import {
  AllTransactionResponse,
  GetTransactionAXIOSResponse,
  GetTransactionResponse,
  PostTransactionValues,
  Transaction,
} from '../Interfaces/Transaction.interface';

const { VITE_API_URI } = import.meta.env;

type TransactionsProps = {
  transaction_id: Readonly<Params<string>> | string;
};

export const getAllTransactions = async (): Promise<AllTransactionResponse> => {
  try {
    const { data, status } = await axios.get<AllTransactionResponse>(
      `${VITE_API_URI}/transactions/all`,
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

export const getTransaction = async (
  transaction_id: TransactionsProps
): Promise<GetTransactionResponse> => {
  try {
    const { data, status } = await axios.get<GetTransactionAXIOSResponse>(
      `${VITE_API_URI}/transactions/?id=${transaction_id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('token') || '{}'
          )}`,
        },
      }
    );
    const result = data[0];
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('UNEXPECTED ERROR');
    }
  }
};

export const saveTransaction = async (values: PostTransactionValues) => {
  try {
    const { data, status } = await axios.post<Transaction>(
      `${VITE_API_URI}/transactions`,
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

export const editTransaction = async (
  values: PostTransactionValues,
  transaction_id: string
) => {
  try {
    const { data, status } = await axios.put<Transaction>(
      `${VITE_API_URI}/transactions/${transaction_id}`,
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

export const deleteTransaction = async (transaction_id: string | undefined) => {
  try {
    const { data, status } = await axios.delete<Transaction>(
      `${VITE_API_URI}/transactions/${transaction_id}`,
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
