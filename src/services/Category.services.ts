import axios from 'axios';
import { Category, PostCategory } from '../Interfaces/Category.interface';

const { VITE_API_URI } = import.meta.env;

export const saveCategory = async (values: PostCategory, id: string) => {
  try {
    const { data, status } = await axios.post<Category>(
      `${VITE_API_URI}/category`,
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
// Edit category
export const editCategory = async (
  values: PostCategory,
  category_id: string
) => {
  try {
    const { data, status } = await axios.put<Category>(
      `${VITE_API_URI}/category/${category_id}`,
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
// Delete category

export const deleteCategory = async (category_id: string) => {
  try {
    const { data, status } = await axios.delete<Category>(
      `${VITE_API_URI}/category/${category_id}`,
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
