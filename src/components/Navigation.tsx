import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link to="/" className="text-blue-400 font-semibold text-lg">
              Converter
            </Link>
            <Link
              to="/currencies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              All Currencies
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
