/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Children, ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import {
  IB2b,
  IIndicationDto,
  IOrderTransaction,
  ISelfPonts,
  IUserDtos,
} from '../dtos';
import { api } from '../services/api';

interface ICreateContextData {
  users: QueryObserverBaseResult;
  indRank: QueryObserverBaseResult;
  globalRank: QueryObserverBaseResult;
}

type TCreation = {
  children: ReactNode;
};

export const LoadDataContext = createContext({} as ICreateContextData);

export function LoadData({ children }: TCreation) {
  const users = useQuery('users', async () => {
    const rs = await api.get('/user/list-all-user');

    return rs.data as IUserDtos[];
  });

  const indRank = useQuery('indrank', async () => {
    const rs = await api.get('/user/global-rank-ind');

    return rs.data as ISelfPonts;
  });

  const globalRank = useQuery('globa-rank', async () => {
    const rs = await api.get('/user/global-rank');

    return rs.data as IOrderTransaction[];
  });

  return (
    <LoadDataContext.Provider value={{ users, indRank, globalRank }}>
      {children}
    </LoadDataContext.Provider>
  );
}
