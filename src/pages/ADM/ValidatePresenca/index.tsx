/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';

import { Header } from '../../../components/Header';
import { ListMembro } from '../../../components/ListMembro';
import { useData } from '../../../contexts/useData';
import { IPresencaDto, IProfileDto, IUserDtos } from '../../../dtos';
import { api } from '../../../services/api';
import * as S from './styles';

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
  const { users } = useData();
  const [presenca, setPresenca] = useState<Props[]>([]);
  const [load, setLoad] = React.useState(true);

  const listOrdersPresenca = React.useCallback(async () => {
    const membro = (users.data as IUserDtos[]) || [];

    await api
      .get('/presenca/list-all-order-presenca')
      .then(async presenca => {
        const rs = presenca.data as IPresencaDto[];

        const response = rs
          .filter(fil => {
            const profile = membro.find(h => {
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
                avatar: profile?.profile.avatar,
              },
            };
          })
          .filter(h => h !== undefined);
        setPresenca(response);
      })
      .catch(h => console.log('erro ao carregar presenca', h));
  }, [users.data]);

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
        .catch(h => Alert.alert('Erro', h.response.data));
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

  if (users.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <S.Container>
      <Header />
      <FlatList
        contentContainerStyle={{
          paddingBottom: 200,
        }}
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
    </S.Container>
  );
}
