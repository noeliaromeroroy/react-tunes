import { createContext, useContext, ReactNode, useState } from 'react';
import { ErrorContextType } from '../interfaces/iContexts';
import { Alert } from '@material-tailwind/react';

const ErrorContext = createContext<ErrorContextType>({
  handleError: (error: any) => {},
});

export const useErrorContext = (): ErrorContextType => {
  return useContext(ErrorContext);
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: any) => {
    setError(err);
  };

  return (
    <ErrorContext.Provider value={{ handleError }}>
      <div className="flex w-full flex-col gap-2">
        {error && (
          <Alert
            color="red"
            onClose={() => setError(null)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
          >
            {error.message}
          </Alert>
        )}
      </div>
      {children}
    </ErrorContext.Provider>
  );
};
