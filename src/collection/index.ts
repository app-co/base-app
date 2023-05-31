export interface IColection {
   users: string;
   transaction: string;
   orderTransaction: string;
   orderIndication: string;
   post: string;
   presenca: string;
   orderB2b: string;
}

export const colecao = {
   users: 'users',
   transaction: 'transaction',
   orderTransaction: 'order_transaction',
   orderIndication: 'order_indication',
   orderB2b: 'order_b2b',
   post: 'post',
   presenca: 'presença',
} as IColection;
