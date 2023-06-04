/* eslint-disable react/jsx-no-constructed-context-values */
import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IGuest } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  invitListAll: QueryObserverBaseResult;
  invitListMe: QueryObserverBaseResult;

  invitCreate(item: IGuest): Promise<void>;
  invitUpdate(id: string): Promise<void>;
  invitDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const InvitContexProvider = createContext({} as ICreateContextData);

export function Invit({ children }: TCreation) {
  const invitListAll = useQuery('invit', async () => {
    const rs = await api.get('/guest');

    return rs.data;
  });

  const invitListMe = useQuery('invit-me', async () => {
    const rs = await api.get('/guest/me');

    return rs.data;
  });

  const invitCreate = React.useCallback(async (item: IGuest) => {
    await api.post('/guest/create-guest', { item });
  }, []);

  const invitUpdate = React.useCallback(
    async (id: string) => {
      await api
        .put(`/guest/up-guest/${id}`)
        .then(h => {
          invitListAll.refetch();
        })
        .catch(h => console.log(h.response.data));
    },
    [invitListAll],
  );

  const invitDelete = React.useCallback(
    async (id: string) => {
      console.log('ok');
      await api
        .delete(`/guest/${id}`)
        .then(() => {
          invitListAll.refetch();
        })
        .catch(h => console.log(h.response.data, 'erro'));
    },
    [invitListAll],
  );

  return (
    <InvitContexProvider.Provider
      value={{
        invitListAll,
        invitListMe,
        invitCreate,
        invitUpdate,
        invitDelete,
      }}
    >
      {children}
    </InvitContexProvider.Provider>
  );
}
