import { useQuery } from "@tanstack/react-query";
import { fetchAllCurrencies } from "../services/currencyService";

export const useAllCurrencies = () => {
  return useQuery({
    queryKey: ["allCurrencies"],
    queryFn: fetchAllCurrencies,
  });
};
