import axios from "axios";
import {
  LoginResponse,
  LoginValues,
  RegisterResponse,
  RegisterValues,
} from "../Interfaces/Auth.interface";

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
          Accept: "application/json",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));

    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const loginUser = async (values: LoginValues) => {
  try {
    const { data, status } = await axios.post<LoginResponse>(
      `${VITE_API_URI}/auth/login`,
      {
        username: values.username,
        password: values.password,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const token = JSON.stringify(data?.token);
    localStorage.setItem("token", token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
