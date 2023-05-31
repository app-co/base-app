/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Children, ReactNode, createContext } from 'react';

import { IB2b, IIndicationDto, IOrderTransaction } from '../dtos';

interface ICreateContextData {
  orderB2b(value: IB2b): Promise<void>;
  orderTransaction(value: IOrderTransaction): Promise<void>;
  orderIndication(value: IIndicationDto): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const CreationContext = createContext({} as ICreateContextData);

export function Creation({ children }: TCreation) {
  const orderB2b = React.useCallback(async () => {
    console.log('orderB2b');
  }, []);

  const orderTransaction = React.useCallback(async () => {
    console.log('orderTransaction');
  }, []);

  const orderIndication = React.useCallback(async () => {
    console.log('indication');
  }, []);

  return (
    <CreationContext.Provider
      value={{ orderB2b, orderTransaction, orderIndication }}
    >
      {children}
    </CreationContext.Provider>
  );
}
