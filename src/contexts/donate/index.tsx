import { useContext } from 'react';

import { DonateContexProvider } from './context';

export function useDonate() {
  const context = useContext(DonateContexProvider);

  return context;
}
