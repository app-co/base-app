/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  HStack,
  Avatar,
} from 'native-base';
import React, { useCallback } from 'react';
import { Alert, FlatList } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styles';

export function Padrinho() {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [users, setUser] = React.useState<IUserDtos[]>([]);
  const [load, setLoad] = React.useState(true);
  const [search, setSearch] = React.useState('');

  const loadUser = React.useCallback(async () => {
    await api
      .get('/user/list-all-user')
      .then(h => {
        const rs = h.data as IUserDtos[];
        const fil = rs.filter(p => p.situation.inativo !== true);
        setUser(fil);
      })
      .catch(h => console.log('erro ao carregar user na tela te padrinho', h))
      .finally(() => setLoad(false));
  }, []);

  const list =
    search !== ''
      ? users.filter(h => {
          if (h.nome.includes(search.toUpperCase())) {
            return h;
          }
        })
      : users;

  React.useEffect(() => {
    loadUser();
  }, []);

  const handleApadrinhar = useCallback(
    async ({ id, nome }: IUserDtos) => {
      const dt = {
        user_id: user.id,
        apadrinhado_name: nome,
        apadrinhado_id: id,
        qnt: 0,
      };
      await api
        .post('/user/create-padrinho', dt)
        .then(h => {
          Alert.alert('Sucesso!', `membro ${nome} foi apadrinhado`);
          loadUser();
        })
        .catch(h => console.log('erro no padrinho', h.response.data));
    },
    [loadUser, user],
  );

  return (
    <NativeBaseProvider>
      <Header />

      <Form>
        <Center mt="8">
          <Input
            autoCapitalize="characters"
            icon="search"
            name="search"
            onChangeText={setSearch}
          />
        </Center>
      </Form>

      <FlatList
        data={list}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <S.button
            afiliado={h.situation.apadrinhado}
            onPress={() => handleApadrinhar(h)}
          >
            <HStack space={4} alignItems="center">
              <Avatar source={{ uri: h.profile.avatar }} />
              <S.text afiliado={h.situation.apadrinhado}>{h.nome}</S.text>
            </HStack>
          </S.button>
        )}
      />

      {/* <FlatList
        data={users}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <MembrosApadrinhado
            imageOfice={h.profile.logo}
            oficio={h.profile.workNa
            userName={h.nome}
            user_avatar={h.profile.avatar}
            pres={() =>
              handleApadrinhar({
                user_id: h.id,
                nome: h.nome,
              })
            }
            inativoPres={h.situation.apadrinhado}
            inativo={h.situation.apadrinhado}
          />
        )}
      /> */}
    </NativeBaseProvider>
  );
}
