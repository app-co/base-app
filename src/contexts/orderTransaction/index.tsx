import { useContext } from 'react';

import { OrderTransactionContexProvider } from './context';

export function useOrderTransaction() {
  const context = useContext(OrderTransactionContexProvider);

  return context;
}
