import { useContext } from 'react';

import { TokenContexProvider } from './context';

export function useToken() {
  const context = useContext(TokenContexProvider);

  return context;
}
