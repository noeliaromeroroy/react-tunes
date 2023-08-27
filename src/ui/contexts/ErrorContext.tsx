import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { ErrorContextType, CustomError } from '../interfaces/iContexts';
import { ErrorAlert } from '../components/ErrorAlert';

const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => null
});

export const useErrorContext = (): ErrorContextType => {
  return useContext(ErrorContext);
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | CustomError | null>(null);

  const clearError = () => {
    setError(null);
  };
  const errorValue = useMemo(
    () => ({
      error,
      setError
    }),
    []
  );
  return (
    <ErrorContext.Provider value={errorValue}>
      <ErrorAlert error={error} onClose={clearError} />
      {children}
    </ErrorContext.Provider>
  );
};
