import { useContext } from 'react';

import { CreationContext } from './CreationContext';

export function useCreation() {
  const context = useContext(CreationContext);

  return context;
}
