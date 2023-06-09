/* eslint-disable react/jsx-no-constructed-context-values */

import React, { ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IOrderTransaction, ITransaction } from '../../dtos';
import { api } from '../../services/api';

interface ICreateContextData {
  orderTransactionListAll: QueryObserverBaseResult;
  orderTransactionListByPrestador: QueryObserverBaseResult;
  orderTransactionListByClient: QueryObserverBaseResult;

  orderTransactionCreate(item: IOrderTransaction): Promise<void>;
  orderTransactionUpdate(item: ITransaction): Promise<void>;
  orderTransactionDelete(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const OrderTransactionContexProvider = createContext(
  {} as ICreateContextData,
);

export function OrderTransaction({ children }: TCreation) {
  const orderTransactionListAll = useQuery('orderTransaction-all', async () => {
    const rs = await api.get('consumo/list-all');

    return rs.data;
  });

  const orderTransactionListByPrestador = useQuery(
    'orderTransaction',
    async () => {
      const rs = await api.get('consumo/find-order-prestador');

      return rs.data;
    },
  );

  const orderTransactionListByClient = useQuery(
    'orderTransaction',
    async () => {
      const rs = await api.get('consumo/find-order-consumidor');

      return rs.data;
    },
  );

  const orderTransactionCreate = React.useCallback(
    async (item: IOrderTransaction) => {
      await api.post('consumo/order-transaction', { item });
    },
    [],
  );

  const orderTransactionUpdate = React.useCallback(
    async (item: ITransaction) => {
      await api
        .post('/transaction/create-transaction', {
          consumidor_name: item.consumidor_id,
          consumidor_id: item.consumidor_id,
          prestador_name: item.prestador_name,
          prestador_id: item.prestador_id,
          descricao: item.descricao,
          order_id: item.id,
          valor: item.valor,
        })
        .catch(h => console.log(h.response));
    },
    [],
  );

  const orderTransactionDelete = React.useCallback(async (id: string) => {
    await api.delete(`/consumo/delete-order/${id}`);
  }, []);

  return (
    <OrderTransactionContexProvider.Provider
      value={{
        orderTransactionListAll,
        orderTransactionListByPrestador,
        orderTransactionListByClient,
        orderTransactionCreate,
        orderTransactionUpdate,
        orderTransactionDelete,
      }}
    >
      {children}
    </OrderTransactionContexProvider.Provider>
  );
}
