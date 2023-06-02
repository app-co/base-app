/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Children, ReactNode, createContext } from 'react';

import { IB2b, IIndicationDto, IOrderTransaction, ITransaction } from '../dtos';
import { api } from '../services/api';

interface PropsIndication {
  id: string;
  who_indication: string;
}

interface ICreateContextData {
  createOrderB2b(value: IB2b): Promise<void>;
  aprovedB2b(id: string): Promise<void>;
  deletB2b(id: string): Promise<void>;

  createOrderTransaction(value: IOrderTransaction): Promise<void>;
  createTransaction(value: ITransaction): Promise<void>;
  aprovedOrderTransaction(item: ITransaction): Promise<void>;
  deleteOrderTransaction(id: string): Promise<void>;

  createOrderIndication(value: IIndicationDto): Promise<void>;
  aprovedOrderIndication({
    id,
    who_indication,
  }: PropsIndication): Promise<void>;
  deleteOrderIndication(id: string): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const CreationContext = createContext({} as ICreateContextData);

export function Creation({ children }: TCreation) {
  const createOrderB2b = React.useCallback(async () => {
    console.log('orderB2b');
  }, []);

  const aprovedB2b = React.useCallback(async (id: string) => {
    await api.put('b2b/validate-b2b', { id });
  }, []);

  const deletB2b = React.useCallback(async (id: string) => {
    await api.delete(`b2b/del-b2b/${id}`);
  }, []);

  const createOrderTransaction = React.useCallback(async () => {
    console.log('orderTransaction');
  }, []);

  const createTransaction = React.useCallback(async () => {
    console.log('orderTransaction');
  }, []);

  const aprovedOrderTransaction = React.useCallback(
    async (item: ITransaction) => {
      await api.post('/transaction/create-transaction', item);
    },
    [],
  );

  const deleteOrderTransaction = React.useCallback(async (id: string) => {
    await api.delete(`/consumo/delete-order/${id}`);
  }, []);

  const createOrderIndication = React.useCallback(
    async (item: IIndicationDto) => {
      await api
        .post('/indication/create-indication', item)
        .catch(h => console.log(h.response.data));
    },
    [],
  );

  const aprovedOrderIndication = React.useCallback(
    async ({ id, who_indication }: PropsIndication) => {
      await api.put('indication/validate-indication', {
        indication_id: id,
        indicado_id: who_indication,
      });
    },
    [],
  );

  const deleteOrderIndication = React.useCallback(async (id: string) => {
    await api.delete(`/indication/${id}`);
  }, []);

  return (
    <CreationContext.Provider
      value={{
        createOrderB2b,
        aprovedB2b,
        deletB2b,
        createOrderTransaction,
        createTransaction,
        aprovedOrderTransaction,
        deleteOrderTransaction,
        createOrderIndication,
        aprovedOrderIndication,
        deleteOrderIndication,
      }}
    >
      {children}
    </CreationContext.Provider>
  );
}
