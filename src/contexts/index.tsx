import React, { createContext } from 'react';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { IOrderTransaction, ITransaction } from '../dtos';
import { api, socket } from '../services/api';

interface ProviderProps {
   children: React.ReactNode;
}

interface PropsContext {
   transactionPrestador: ITransaction[];
   transactionConsumidor: ITransaction[];
   allTransaction: ITransaction[];
   orderPrestador: IOrderTransaction[];
   orderConsumidor: IOrderTransaction[];
}

export const ApiContext = createContext({} as PropsContext);

export function ApiProvider({ children }: ProviderProps) {
   const orderConsumo = useQuery('orderConsumo', async () => {
      const orde = await api.get('/consumo/find-order-consumidor');
      return orde.data;
   });

   const [transactionPrestador, setTransactionPrestador] = React.useState<
      ITransaction[]
   >([]);
   const [transactionConsumidor, setTransactionConsumidor] = React.useState<
      ITransaction[]
   >([]);
   const [allTransaction, setAllTransaction] = React.useState<ITransaction[]>(
      [],
   );

   const [orderPrestador, setOrderPrestador] = React.useState<
      IOrderTransaction[]
   >([]);

   const [orderConsumidor, setOrderConsumidor] = React.useState();

   const listTrasactionPrestador = React.useCallback(async () => {
      await api.get('transaction/list-by-prestador').then(h => {
         let vl = 0;
         const rs = h.data as ITransaction[];
         const ft = rs.map(p => {
            if (new Date(p.created_at).getDate() > 8) {
               vl = p.valor / 100;
            } else {
               vl = p.valor;
            }

            const valorFormated = vl.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });
            return {
               ...p,
               date: format(new Date(p.created_at), 'dd-MM-yyyy'),
               valorFormated,
            };
         });
         setTransactionPrestador(ft);
      });
   }, []);

   const listTrasactionConsumidor = React.useCallback(async () => {
      await api.get('transaction/list-by-prestador').then(h => {
         let vl = 0;
         const rs = h.data as ITransaction[];
         const ft = rs.map(p => {
            if (new Date(p.created_at).getDate() > 8) {
               vl = p.valor / 100;
            } else {
               vl = p.valor;
            }

            const valorFormated = vl.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });
            return {
               ...p,
               date: format(new Date(p.created_at), 'dd-MM-yyyy'),
               valorFormated,
            };
         });
         setTransactionConsumidor(ft);
      });
   }, []);

   const listAllTrasaction = React.useCallback(async () => {
      await api
         .get('transaction/list-all-transaction')
         .then(h => {
            const rs = h.data as ITransaction[];
            let vl = 0;
            const ft = rs.map(p => {
               if (new Date(p.created_at).getDate() > 8) {
                  vl = p.valor / 100;
               } else {
                  vl = p.valor;
               }

               const valorFormated = vl.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               });
               return {
                  ...p,
                  date: format(new Date(p.created_at), 'dd-MM-yyyy'),
                  valorFormated,
               };
            });

            setAllTransaction(ft);
         })
         .catch(h => console.log(h));
   }, []);

   // TODO ORDERS ...........................................

   const listOrderPrestador = React.useCallback(async () => {
      await api.get('/consumo/find-order-prestador').then(h => {
         const rs = h.data as IOrderTransaction[];
         setOrderPrestador(rs);
      });

      socket.on('order-trans', (ontime: IOrderTransaction) => {
         console.log(ontime.valor, 'io');
         setOrderPrestador([...orderPrestador, ontime]);
      });
   }, []);

   const listOrderConsumidor = React.useCallback(async () => {
      await api.get('/consumo/find-order-consumidor').then(h => {
         const rs = h.data as IOrderTransaction[];
         setOrderConsumidor(rs);
      });
   }, []);

   React.useEffect(() => {
      listOrderPrestador();
      listOrderConsumidor();

      listTrasactionPrestador();
      listTrasactionConsumidor();

      listAllTrasaction();
   }, [
      listAllTrasaction,
      listOrderConsumidor,
      listOrderPrestador,
      listTrasactionConsumidor,
      listTrasactionPrestador,
   ]);

   return (
      <ApiContext.Provider
         value={{
            transactionPrestador,
            transactionConsumidor,
            allTransaction,
            orderPrestador,
            orderConsumidor,
         }}
      >
         {children}
      </ApiContext.Provider>
   );
}
