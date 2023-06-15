/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IIndicationDto } from '../../dtos';
import { Sucess } from '../../pages/Sucess';
import { api } from '../../services/api';

interface Props {
  indication_id: string;
  indicado_id: string;
}

interface ICreateContextData {
  indicationListAll: QueryObserverBaseResult;
  indicationListMe: QueryObserverBaseResult;

  indicationCreate(item: IIndicationDto): Promise<void>;
  indicationUpdate(item: Props): Promise<void>;
  indicationDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const IndicationContexProvider = createContext({} as ICreateContextData);

export function Indication({ children }: TCreation) {
  const indicationListAll = useQuery('indication-all', async () => {
    const rs = await api.get('indication/list-all');

    return rs.data;
  });

  const indicationListMe = useQuery('indication-me', async () => {
    const rs = await api.get('indication/list-by-indication');

    return rs.data;
  });

  const indicationCreate = React.useCallback(async (item: IIndicationDto) => {
    await api.post('indication/create-indication', { item });
  }, []);

  const indicationUpdate = React.useCallback(async (item: Props) => {
    await api
      .put('indication/validate-indication', {
        indicado_id: item.indicado_id,
        idication_id: item.indication_id,
      })
      .then(() => {
        indicationListMe.refetch();
      })
      .catch(h => console.log('erro'));
  }, []);

  const indicationDelete = React.useCallback(async (id: string) => {
    await api
      .delete(`/indication/del-indication/${id}`)
      .catch(h => console.log(h.response))
      .then(h => {
        indicationListMe.refetch();
      });
  }, []);

  return (
    <IndicationContexProvider.Provider
      value={{
        indicationListAll,
        indicationListMe,
        indicationCreate,
        indicationUpdate,
        indicationDelete,
      }}
    >
      {children}
    </IndicationContexProvider.Provider>
  );
}
