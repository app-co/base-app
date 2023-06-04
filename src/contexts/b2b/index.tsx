import { useContext } from 'react';

import { B2bContexProvider } from './context';

export function useB2b() {
  const context = useContext(B2bContexProvider);

  return context;
}
