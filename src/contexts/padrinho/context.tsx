/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IPadrinho } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

interface ICreateContextData {
  padrinhoListAll: QueryObserverBaseResult;
  padrinhoListMe: QueryObserverBaseResult;

  padrinhoCreate(item: IPadrinho): Promise<void>;
  padrinhoUpdate(item: any): Promise<void>;
  padrinhoDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const PadrinhoContexProvider = createContext({} as ICreateContextData);

export function PadrinhoContext({ children }: TCreation) {
  const { user } = useAuth();
  const padrinhoListAll = useQuery('padrinho-all', async () => {
    const rs = await api
      .get('/user/padrinho')
      .then(h => {
        return h.data;
      })
      .catch(h => console.log(h.response));
  });

  const padrinhoListMe = useQuery('padrinho-me', async () => {
    const rs = await api.get(`/user/padrinho/${user.id}`);
    return rs.data;
  });

  const padrinhoCreate = React.useCallback(async (item: IPadrinho) => {
    await api.post('user/create-padrinho', { item });
  }, []);

  const padrinhoUpdate = React.useCallback(async (item: any) => {
    await api.put('', { item });
  }, []);

  const padrinhoDelete = React.useCallback(async (id: string) => {
    await api.delete(`/${id}`);
  }, []);

  return (
    <PadrinhoContexProvider.Provider
      value={{
        padrinhoListAll,
        padrinhoListMe,
        padrinhoCreate,
        padrinhoUpdate,
        padrinhoDelete,
      }}
    >
      {children}
    </PadrinhoContexProvider.Provider>
  );
}
