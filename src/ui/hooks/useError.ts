import { useErrorContext } from '../contexts/ErrorContext';

export const useErrorHandler = () => {
    const { error, setError } = useErrorContext();

    const handleError = (err: any) => {
        setError(err);
    };

    return { error, handleError };
};
