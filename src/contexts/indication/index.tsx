import { useContext } from 'react';

import{ IndicationContexProvider } from './context';

export function useIndication() {
  const context = useContext(IndicationContexProvider);

  return context;
}
