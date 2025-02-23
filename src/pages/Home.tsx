import { useState, useEffect, useMemo } from "react";
import { useDefaultCurrencies } from "../hooks/useDefaultCurrencies";
import { useAllCurrencies } from "../hooks/useAllCurrencies";
import { useConvertAll } from "../hooks/useConvertAll";
import CurrencyCard from "../components/CurrencyCard";
import { Currency } from "../types/currency";
import { initializeAmounts } from "../utils/currencyConversion";
import LoadingErrorState from "../components/LoadingErrorState";
import AddCurrencySection from "../components/AddCurrencySction";

const HomePage: React.FC = () => {
  const {
    data: defaultCurrencies,
    isLoading,
    isError,
  } = useDefaultCurrencies();
  const { data: allCurrencies } = useAllCurrencies();
  const [amounts, setAmounts] = useState<{ [code: string]: number }>({});
  const [activeCurrency, setActiveCurrency] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [displayedCurrencies, setDisplayedCurrencies] = useState<Currency[]>(
    []
  );
  const { mutateAsync: convertAll } = useConvertAll();

  // Initialize amounts with rates
  useEffect(() => {
    if (defaultCurrencies) {
      const initialAmounts = initializeAmounts(defaultCurrencies);
      setAmounts(initialAmounts);
      setDisplayedCurrencies(defaultCurrencies);
    }
  }, [defaultCurrencies]);

  // Memoize the displayed currencies
  const memoizedDisplayedCurrencies = useMemo(() => {
    return displayedCurrencies;
  }, [displayedCurrencies]);

  // Memoize the amounts object
  const memoizedAmounts = useMemo(() => {
    return amounts;
  }, [amounts]);

  const handleAmountChange = async (code: string, value: number) => {
    if (!displayedCurrencies) return;

    // Update the active currencies amount immediately
    const newAmounts = { ...amounts, [code]: value };
    setAmounts(newAmounts);
    setActiveCurrency(code);

    // Get target currency codes (exclude the active one)
    const targetCodes = displayedCurrencies
      .filter((c) => c.code !== code)
      .map((c) => c.code);

    // Send a request for all conversions
    try {
      const results = await convertAll({
        from: code,
        amount: value,
        to: targetCodes,
      });

      // Update all amounts
      setAmounts((prev) => ({
        ...prev,
        ...results,
        [code]: value,
      }));
    } catch (error) {
      console.error("Batch conversion failed:", error);
    }
  };

  const handleAddCurrency = () => {
    if (!selectedCurrency || !allCurrencies) return;

    // Find the selected currency
    const currencyToAdd = allCurrencies.find(
      (c: Currency) => c.code === selectedCurrency
    );

    if (
      currencyToAdd &&
      !displayedCurrencies.some((c) => c.code === selectedCurrency)
    ) {
      // Add the currency to the displayed list
      setDisplayedCurrencies((prev) => [...prev, currencyToAdd]);

      // Initialize its amount with the current rate
      const rate = currencyToAdd.exchange_rates[0]?.rate || 1;
      setAmounts((prev) => ({ ...prev, [selectedCurrency]: rate }));
    }
  };

  return (
    <div className="max-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Currency Converter</h1>
        <p className="text-gray-400 mb-8">
          Real-time exchange rates based on USD
        </p>

        {/* Loading and Error States */}
        <LoadingErrorState isLoading={isLoading} isError={isError} />

        {/* Currency List */}
        <div className="space-y-4">
          {memoizedDisplayedCurrencies?.map((currency: Currency) => (
            <CurrencyCard
              key={currency.code}
              code={currency.code}
              value={memoizedAmounts[currency.code]}
              onChange={(value) => handleAmountChange(currency.code, value)}
              isActive={activeCurrency === currency.code}
            />
          ))}
        </div>

        {/* Add Currency Section */}
        <AddCurrencySection
          allCurrencies={allCurrencies || []}
          displayedCurrencies={displayedCurrencies}
          selectedCurrency={selectedCurrency}
          onSelectCurrency={setSelectedCurrency}
          onAddCurrency={handleAddCurrency}
        />
      </div>
    </div>
  );
};

export default HomePage;
