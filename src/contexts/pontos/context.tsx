/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IGlobalPonts, ISelfPonts } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  global: QueryObserverBaseResult;
  pontosListMe: QueryObserverBaseResult;
}

type TCreation = {
  children: ReactNode;
};

export const PontosContexProvider = createContext({} as ICreateContextData);

export function Pontos({ children }: TCreation) {
  const global = useQuery('pontos', async () => {
    const rs = await api.get('/user/global-rank');

    return rs.data as IGlobalPonts;
  });

  const pontosListMe = useQuery('pontos', async () => {
    const rs = await api.get('user/global-rank-ind');

    return rs.data as ISelfPonts;
  });

  return (
    <PontosContexProvider.Provider value={{ global, pontosListMe }}>
      {children}
    </PontosContexProvider.Provider>
  );
}
