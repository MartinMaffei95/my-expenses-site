import axios from 'axios';
import { AllAccountsResponse } from '../Interfaces/Account.interface';

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
