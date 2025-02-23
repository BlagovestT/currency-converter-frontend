interface LoadingErrorStateProps {
  isLoading: boolean;
  isError: boolean;
  loadingMessage?: string;
  errorMessage?: string;
}

const LoadingErrorState: React.FC<LoadingErrorStateProps> = ({
  isLoading,
  isError,
  loadingMessage = "Loading...",
  errorMessage = "Error fetching data",
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white">{loadingMessage}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-red-500">{errorMessage}</div>
      </div>
    );
  }

  return null;
};

export default LoadingErrorState;
