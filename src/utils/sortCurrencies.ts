import { Currency } from "../types/currency";

export const sortCurrencies = (
  currencies: Currency[],
  sortBy: "code" | "rate",
  sortOrder: "asc" | "desc"
): Currency[] => {
  return [...currencies].sort((a, b) => {
    if (sortBy === "code") {
      return sortOrder === "asc"
        ? a.code.localeCompare(b.code)
        : b.code.localeCompare(a.code);
    } else {
      const rateA = a.exchange_rates[0]?.rate || 0;
      const rateB = b.exchange_rates[0]?.rate || 0;
      return sortOrder === "asc" ? rateA - rateB : rateB - rateA;
    }
  });
};
