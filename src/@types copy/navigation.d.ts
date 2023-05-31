import { IUserDtos } from '../dtos';

/* eslint-disable camelcase */
export type TransactionNavigtionsProps = {
   prestador: IUserDtos;
};

export type OrderNavigationIndication = {
   quemIndicou: string;
   id: string;
};

type Sucess = {
   prestador: IUserDtos;
   description: string;
};

export declare global {
   namespace ReactNavigation {
      interface RootParamList {
         INÍCIO: undefined;
         POSTS: undefined;
         'VALIDE SUA PRESENSA': undefined;
         'LANÇAR CONSUMO': undefined;
         INDICAÇÕES: undefined;
         classificaçao: undefined;
         B2B: undefined;
         PERFIL: undefined;
         ranking: undefined;
         user: undefined;
         presenca: undefined;
         updateSenha: undefined;
         delete: undefined;
         product: TransactionNavigtionsProps;
         order: undefined;
         Inicio: undefined;
         indication: OrderNavigationIndication;
         Transaction: TransactionNavigtionsProps;
         orderB2b: TransactionNavigtionsProps;
         Post: undefined;
         Membros: undefined;
         sucess: Sucess;
         'LISTA DE PRESENÇA': undefined;
      }
   }
}
