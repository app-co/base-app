import { useContext } from 'react';

import { InvitContexProvider } from './context';

export function useInvit() {
  const context = useContext(InvitContexProvider);

  return context;
}
