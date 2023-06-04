import { useContext } from 'react';

import { PontosContexProvider } from './context';

export function usePontos() {
  const context = useContext(PontosContexProvider);

  return context;
}
