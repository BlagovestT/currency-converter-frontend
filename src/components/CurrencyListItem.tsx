import { Currency } from "../types/currency";

interface CurrencyListItemProps {
  currency: Currency;
}

const CurrencyListItem: React.FC<CurrencyListItemProps> = ({ currency }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{currency.code}</h3>
          <p className="text-gray-400 text-sm">{currency.code || "Currency"}</p>
        </div>
        <div className="text-lg font-bold">
          {currency.exchange_rates[0]?.rate || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default CurrencyListItem;
