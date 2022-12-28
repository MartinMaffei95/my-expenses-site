import axios from 'axios';
import { User } from '../Interfaces/Auth.interface';
import { AllTransactionResponse } from '../Interfaces/Transaction.interface';

const { VITE_API_URI } = import.meta.env;

export const getUserData = async (): Promise<User> => {
  try {
    const { data, status } = await axios.get<User>(
      `${VITE_API_URI}/user/${JSON.parse(
        localStorage.getItem('user_id') || '{}'
      )}`,
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
      console.log('error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.log('unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
