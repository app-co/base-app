import { useContext } from 'react';

import{ TransactionContexProvider } from './context';

export function useTransaction() {
  const context = useContext(TransactionContexProvider);

  return context;
}
