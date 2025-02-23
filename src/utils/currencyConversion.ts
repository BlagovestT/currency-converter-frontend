import { Currency } from "../types/currency";

export const initializeAmounts = (currencies: Currency[]) => {
  return currencies.reduce((acc, currency) => {
    const rate = currency.exchange_rates[0]?.rate || 1;
    acc[currency.code] = rate;
    return acc;
  }, {} as { [code: string]: number });
};
