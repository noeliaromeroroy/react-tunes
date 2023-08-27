import React from 'react';
import { Alert } from '@material-tailwind/react';
import { CustomError, ErrorTitles } from '../interfaces/iContexts';
import styles from './ErrorAlert.module.css';

interface ErrorAlertProps {
  error: Error | CustomError | null;
  onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) =>
  error && (
    <div className="relative">
      <Alert
        className={styles.ErrorAlert}
        color="red"
        variant="outlined"
        onClose={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 }
        }}
      >
        {'type' in error && <h1>{ErrorTitles[error.type]}</h1>}
        <p>{error.message}</p>
      </Alert>
    </div>
  );
