import { useContext } from 'react';

import { LoadOrdersContext } from './LoadOrders';

export function useOrders() {
  const context = useContext(LoadOrdersContext);

  return context;
}
