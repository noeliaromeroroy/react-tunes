import { createContext, useContext, ReactNode, useState } from 'react';
import { ErrorContextType, CustomError } from '../interfaces/iContexts';
import { Alert } from '@material-tailwind/react';

const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: (value: React.SetStateAction<Error | CustomError | null>) => null,
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

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      <div className="flex w-[90%] flex-col gap-2 absolute t-3 z-10">
        {error && (
          <Alert
            color="red"
            onClose={clearError}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
          >
            {'type' in error && error.type === 'playErr' && (
              <h1>Error playing podcast</h1>
            )}
            <p>{error.message}</p>
          </Alert>
        )}
      </div>
      {children}
    </ErrorContext.Provider>
  );
};
