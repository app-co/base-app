import { useContext } from 'react';

import{ PadrinhoContexProvider } from './context';

export function usePadrinho() {
  const context = useContext(PadrinhoContexProvider);

  return context;
}
