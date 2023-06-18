/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IB2b } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  b2bListAll: QueryObserverBaseResult;
  b2bListMe: QueryObserverBaseResult;

  b2bCreate(item: IB2b): Promise<void>;
  b2bUpdate(id: string): Promise<void>;
  b2bDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const B2bContexProvider = createContext({} as ICreateContextData);

export function B2b({ children }: TCreation) {
  const b2bListAll = useQuery('b2b-all', async () => {
    const res = await api.get('b2b/list-all-b2b');
    return res.data;
  });

  const b2bListMe = useQuery('b2b-me', async () => {
    try {
      const rs = await api.get('b2b/list-by-recevid');
      return rs.data;
    } catch (err) {
      console.log(err, 'erro');
    }
  });

  const b2bCreate = React.useCallback(async (item: IB2b) => {
    await api.post('b2b/create-b2b', {
      send_id: item.send_id,
      send_name: item.send_name,
      recevid_id: item.recevid_id,
      recevid_name: item.recevid_name,
      appointment: item.appointment,
      validate: item.validate,
      assunto: item.assunto,
    });
  }, []);

  const b2bUpdate = React.useCallback(
    async (id: string) => {
      await api.put('b2b/validate-b2b', { id }).then(h => {
        b2bListMe.refetch();
      });
    },
    [b2bListMe],
  );

  const b2bDelete = React.useCallback(async (id: string) => {
    await api.delete(`b2b/del-b2b${id}`);
  }, []);

  return (
    <B2bContexProvider.Provider
      value={{ b2bListAll, b2bListMe, b2bCreate, b2bUpdate, b2bDelete }}
    >
      {children}
    </B2bContexProvider.Provider>
  );
}
