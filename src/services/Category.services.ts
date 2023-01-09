import axios from 'axios';
import { Category, PostCategory } from '../Interfaces/Category.interface';

const { VITE_API_URI } = import.meta.env;

export const saveCategory = async (values: PostCategory, id: string) => {
  try {
    const { data, status } = await axios.post<Category>(
      `${VITE_API_URI}/user/${id}/addCategory`,
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
