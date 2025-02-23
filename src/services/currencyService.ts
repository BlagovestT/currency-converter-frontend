import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCurrencies = async () => {
  const response = await axios.get(`${API_URL}/currencies`);
  return response.data;
};

export const convertAll = async (
  from: string,
  amount: number,
  to: string[]
) => {
  const response = await axios.post(`${API_URL}/convert-all`, {
    from,
    amount,
    to,
  });
  return response.data;
};
