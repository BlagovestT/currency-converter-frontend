import { useState, useMemo } from "react";
import { useAllCurrencies } from "../hooks/useAllCurrencies";
import { sortCurrencies } from "../utils/sortCurrencies";
import LoadingErrorState from "../components/LoadingErrorState";
import CurrencyListItem from "../components/CurrencyListItem";

const CurrenciesPage: React.FC = () => {
  const { data: allCurrencies, isLoading, isError } = useAllCurrencies();
  const [sortBy, setSortBy] = useState<"code" | "rate">("code");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Memoize the sorted currencies
  const sortedCurrencies = useMemo(() => {
    if (!allCurrencies) return [];
    return sortCurrencies(allCurrencies, sortBy, sortOrder);
  }, [allCurrencies, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Currencies</h1>
        <p className="text-gray-400 mb-8">Exchange rates are based on 1 USD.</p>

        {/* Sorting Controls */}
        <div className="flex items-center space-x-4 mb-6">
          <label className="text-gray-400">Sort by:</label>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "code" | "rate")}
          >
            <option value="code">Code</option>
            <option value="rate">Rate</option>
          </select>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Loading and Error States */}
        <LoadingErrorState isLoading={isLoading} isError={isError} />

        {/* Currency List */}
        <div className="space-y-4">
          {sortedCurrencies.map((currency) => (
            <CurrencyListItem key={currency.code} currency={currency} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrenciesPage;
