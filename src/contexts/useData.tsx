import { useContext } from 'react';

import { LoadDataContext } from './LoadDataContext';

export function useData() {
  const contex = useContext(LoadDataContext);

  return contex;
}
