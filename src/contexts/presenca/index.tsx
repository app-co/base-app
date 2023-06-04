import { useContext } from 'react';

import { PresencaContexProvider } from './context';

export function usePresenca() {
  const context = useContext(PresencaContexProvider);

  return context;
}
