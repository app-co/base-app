/* eslint-disable react/jsx-no-constructed-context-values */
import React, { ReactNode, createContext } from 'react';
import { Alert } from 'react-native';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IDonate } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  donateListAll: QueryObserverBaseResult;
  donateListMe: QueryObserverBaseResult;

  donateCreate(item: string): Promise<void>;
  donateUpdate(id: string): Promise<void>;
  donateDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const DonateContexProvider = createContext({} as ICreateContextData);

export function Donate({ children }: TCreation) {
  const donateListAll = useQuery('donate-all', async () => {
    const rs = await api.get('/donate/');

    return rs.data;
  });

  const donateListMe = useQuery('donate', async () => {
    const rs = await api.get('');

    return rs.data;
  });

  const donateCreate = React.useCallback(async (item: string) => {
    await api.post('/donate/create', { itens: item });
  }, []);

  const donateUpdate = React.useCallback(
    async (id: string) => {
      await api
        .put(`donate/approved/${id}`)
        .catch(h => console.log(h.response.data))
        .then(h => {
          donateListAll.refetch();
        });
    },
    [donateListAll],
  );

  const donateDelete = React.useCallback(
    async (id: string) => {
      await api
        .delete(`/donate/${id}`)
        .catch(h => console.log(h.response.data))
        .then(h => {
          donateListAll.refetch();
        });
    },
    [donateListAll],
  );

  return (
    <DonateContexProvider.Provider
      value={{
        donateListAll,
        donateListMe,
        donateCreate,
        donateUpdate,
        donateDelete,
      }}
    >
      {children}
    </DonateContexProvider.Provider>
  );
}
