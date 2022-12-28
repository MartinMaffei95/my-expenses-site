import axios from 'axios';
import {
  AllTransactionResponse,
  PostTransactionValues,
  Transaction,
} from '../Interfaces/Transaction.interface';

const { VITE_API_URI } = import.meta.env;

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
