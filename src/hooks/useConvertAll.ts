import { useMutation } from "@tanstack/react-query";
import { convertAll } from "../services/currencyService";

export const useConvertAll = () => {
  return useMutation({
    mutationFn: (data: { from: string; amount: number; to: string[] }) =>
      convertAll(data.from, data.amount, data.to),
  });
};
