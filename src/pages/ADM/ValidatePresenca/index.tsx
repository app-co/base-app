/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import { HeaderContaponent } from '../../../components/HeaderComponent';
import { Container } from './styles';
import { api } from '../../../services/api';
import { IPresencaDto, IProfileDto, IUserDtos } from '../../../dtos';
import { Loading } from '../../../components/Loading';
import { ListMembro } from '../../../components/ListMembro';

export interface ProsPresenca {
   createdAt: string;
   id: string;
   presenca: boolean;
   user_id: string;
   nome: string;
   avatar: string;
   data: string;
}

interface IUser {
   user: IUserDtos;
   profile: IProfileDto;
}

interface Props {
   presenca: IPresencaDto;
   profile: {
      avatar: string;
   };
}

export function ListPresenca() {
   const [presenca, setPresenca] = useState<Props[]>([]);
   const [load, setLoad] = React.useState(true);

   const listOrdersPresenca = React.useCallback(async () => {
      await api.get('/user/list-all-user').then(async user => {
         const membro = user.data as IUserDtos[];
         await api
            .get('/presenca/list-all-order-presenca')
            .then(async presenca => {
               const rs = presenca.data as IPresencaDto[];

               const response = rs
                  .filter(fil => {
                     const profile = membro.find(h => {
                        console.log(h.id);
                        if (h.id === fil.user_id) {
                           return h;
                        }
                     });

                     if (profile) {
                        return fil;
                     }
                  })
                  .map(respo => {
                     const profile = membro.find(h => {
                        if (h.id === respo.user_id) {
                           return h;
                        }
                     });
                     return {
                        presenca: {
                           ...respo,
                           data: format(new Date(respo.createdAt), 'dd/MM/yy'),
                        },
                        profile: {
                           avatar: profile.profile.avatar,
                        },
                     };
                  })
                  .filter(h => h !== undefined);
               setPresenca(response);
            })
            .catch(h => console.log('erro ao carregar presenca', h))
            .finally(() => setLoad(false));
      });
   }, []);

   useFocusEffect(
      useCallback(() => {
         listOrdersPresenca();
      }, [listOrdersPresenca]),
   );

   const handleValidatePresensa = useCallback(
      async ({ nome, user_id }: IPresencaDto) => {
         const dados = {
            user_id,
            nome,
            presenca: true,
         };
         await api
            .post('/presenca/create-presenca', dados)
            .then(() => {
               listOrdersPresenca();
            })
            .catch(h => Alert.alert('Erro', h.response.data.message));
      },
      [listOrdersPresenca],
   );

   const handleDescartar = useCallback(
      async (id: string) => {
         await api
            .delete(`presenca/delete-order/${id}`)
            .then(h => {
               Alert.alert('Sucesso!', 'presensa cancelada com sucesso');
               listOrdersPresenca();
            })
            .catch(h => Alert.alert('Erro', h.response.data.message));
      },
      [listOrdersPresenca],
   );

   if (load) {
      return <Loading />;
   }

   return (
      <Container>
         <HeaderContaponent type="tipo1" title="Confirmar presença" />

         <FlatList
            data={presenca}
            keyExtractor={h => h.presenca.id}
            renderItem={({ item: h }) => (
               <ListMembro
                  descartar={() => {
                     handleDescartar(h.presenca.id);
                  }}
                  confirmar="Confirmar"
                  nome={h.presenca.nome}
                  data={h.presenca.data}
                  avatar={h.profile.avatar}
                  pres={() =>
                     handleValidatePresensa({
                        nome: h.presenca.nome,
                        user_id: h.presenca.user_id,
                     })
                  }
               />
            )}
         />
      </Container>
   );
}
