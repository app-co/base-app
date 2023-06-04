/* eslint-disable react/jsx-no-constructed-context-values */
import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IOrderTransaction, ITransaction } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  transactionListAll: QueryObserverBaseResult;
  transactionListByPrestador: QueryObserverBaseResult;
  transactionListByClient: QueryObserverBaseResult;

  transactionCreate(item: ITransaction): Promise<void>;
  transactionDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const TransactionContexProvider = createContext(
  {} as ICreateContextData,
);

export function Transaction({ children }: TCreation) {
  const transactionListAll = useQuery('transaction-all', async () => {
    const rs = await api.get('transaction/list-all');

    return rs.data;
  });

  const transactionListByPrestador = useQuery(
    'transaction-prestador',
    async () => {
      const rs = await api.get('transaction/list-by-prestador');

      return rs.data as IOrderTransaction[];
    },
  );

  const transactionListByClient = useQuery('transaction-client', async () => {
    const rs = await api.get('transaction/list-by-consumidor');

    return rs.data;
  });

  const transactionCreate = React.useCallback(async (item: ITransaction) => {
    await api.post('transaction/create-transaction', { item });
  }, []);

  const transactionDelete = React.useCallback(async (id: string) => {
    await api.delete(`/${id}`);
  }, []);

  return (
    <TransactionContexProvider.Provider
      value={{
        transactionListAll,
        transactionListByPrestador,
        transactionListByClient,
        transactionCreate,
        transactionDelete,
      }}
    >
      {children}
    </TransactionContexProvider.Provider>
  );
}
