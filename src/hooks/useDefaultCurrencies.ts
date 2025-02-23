import { useQuery } from "@tanstack/react-query";
import { fetchAllCurrencies } from "../services/currencyService";
import { Currency } from "../types/currency";

export const useDefaultCurrencies = () => {
  return useQuery({
    queryKey: ["defaultCurrencies"],
    queryFn: fetchAllCurrencies,
    select: (data: Currency[]) => {
      const defaultCodes = ["USD", "EUR", "RUB", "BYN"];
      const defaultCurrencies = data.filter((currency) =>
        defaultCodes.includes(currency.code)
      );

      // Sort default currencies in a specific order
      return defaultCurrencies.sort((a, b) => {
        return defaultCodes.indexOf(a.code) - defaultCodes.indexOf(b.code);
      });
    },
  });
};
