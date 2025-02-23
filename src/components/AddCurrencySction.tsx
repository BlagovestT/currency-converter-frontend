import { Currency } from "../types/currency";

interface AddCurrencySectionProps {
  allCurrencies: Currency[];
  displayedCurrencies: Currency[];
  selectedCurrency: string;
  onSelectCurrency: (code: string) => void;
  onAddCurrency: () => void;
}

const AddCurrencySection: React.FC<AddCurrencySectionProps> = ({
  allCurrencies,
  displayedCurrencies,
  selectedCurrency,
  onSelectCurrency,
  onAddCurrency,
}) => {
  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          className="w-full sm:w-48 bg-gray-700 text-white rounded-md px-3 py-2
                   border border-gray-600 focus:border-blue-500 outline-none"
          value={selectedCurrency}
          onChange={(e) => onSelectCurrency(e.target.value)}
        >
          <option value="">Select Currency</option>
          {allCurrencies
            ?.filter(
              (currency) =>
                !displayedCurrencies.some((c) => c.code === currency.code)
            )
            .map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
        </select>
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white 
                   px-6 py-2 rounded-md transition-colors"
          onClick={onAddCurrency}
        >
          Add Currency
        </button>
      </div>
    </div>
  );
};

export default AddCurrencySection;
