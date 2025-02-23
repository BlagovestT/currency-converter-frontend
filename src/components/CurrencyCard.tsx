interface CurrencyCardProps {
  code: string;
  value: number;
  onChange: (value: number) => void;
  isActive: boolean;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  code,
  value,
  onChange,
  isActive,
}) => {
  return (
    <div
      className={`p-4 rounded-lg transition-all ${
        isActive
          ? "bg-blue-900/30 ring-2 ring-blue-500"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-white">{code}</span>
          <span className="text-gray-400 text-sm">Rate</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-32 bg-gray-900 text-white rounded-md px-3 py-2 
                     border border-gray-600 focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-500 outline-none appearance-none"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            onFocus={() => onChange(value)}
            placeholder="Enter value"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
