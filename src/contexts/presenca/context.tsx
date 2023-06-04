/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IPresencaDto } from '../../dtos';
import { api } from '../../services/api';

interface Props {
  user_id: string;
  nome: string;
}

interface ICreateContextData {
  presencaListAll: QueryObserverBaseResult;
  presencaListMe: QueryObserverBaseResult;

  presencaCreate(item: IPresencaDto): Promise<void>;
  presencaUpdate(item: Props): Promise<void>;
  presencaDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const PresencaContexProvider = createContext({} as ICreateContextData);

export function PresencaContext({ children }: TCreation) {
  const presencaListAll = useQuery('presenca-all', async () => {
    const rs = await api.get('presenca/list-all');
    return rs.data;
  });

  const presencaListMe = useQuery('presenca-me', async () => {
    const rs = await api.get('');
    return rs;
  });

  const presencaCreate = React.useCallback(async (item: IPresencaDto) => {
    await api.post('presenca/create-order-presenca', { item });
  }, []);

  const presencaUpdate = React.useCallback(async (item: Props) => {
    await api.put('presenca', { item });
  }, []);

  const presencaDelete = React.useCallback(async (id: string) => {
    await api.delete(`presenca/delete-order/${id}`);
  }, []);

  return (
    <PresencaContexProvider.Provider
      value={{
        presencaListAll,
        presencaListMe,
        presencaCreate,
        presencaUpdate,
        presencaDelete,
      }}
    >
      {children}
    </PresencaContexProvider.Provider>
  );
}
