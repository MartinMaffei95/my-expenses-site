import axios from "axios";
import { AllTransactionResponse } from "../Interfaces/Transaction.interface";

const { VITE_API_URI } = import.meta.env;

const token: string | null = JSON.parse(localStorage.getItem("token"));

export const getAllTransactions = async (): Promise<AllTransactionResponse> => {
  try {
    const { data, status } = await axios.get<AllTransactionResponse>(
      `${VITE_API_URI}/transactions/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
