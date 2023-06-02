/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Children, ReactNode, createContext } from 'react';
import { QueryObserverBaseResult, useQuery } from 'react-query';

import { IB2b, IIndicationDto, IOrderTransaction } from '../dtos';
import { api } from '../services/api';

interface ICreateContextData {
  loadOrderB2b: QueryObserverBaseResult;
  loadOrderTransaction: QueryObserverBaseResult;
  loadOrderIndication: QueryObserverBaseResult;
}

type TCreation = {
  children: ReactNode;
};

export const LoadOrdersContext = createContext({} as ICreateContextData);

export function LoadOrders({ children }: TCreation) {
  const loadOrderB2b = useQuery('b2b', async () => {
    const rs = await api.get('b2b/list-by-recevid');

    return rs.data as IB2b[];
  });

  const loadOrderIndication = useQuery('indication', async () => {
    const rs = await api.get('indication/list-by-indication');

    return rs.data as IIndicationDto[];
  });

  const loadOrderTransaction = useQuery('transaction', async () => {
    const rs = await api.get('consumo/find-order-prestador ');

    return rs.data as IOrderTransaction[];
  });

  return (
    <LoadOrdersContext.Provider
      value={{ loadOrderB2b, loadOrderIndication, loadOrderTransaction }}
    >
      {children}
    </LoadOrdersContext.Provider>
  );
}
