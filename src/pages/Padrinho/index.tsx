/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Text, Box, Center } from 'native-base';
import React, { useCallback } from 'react';
import { Alert, FlatList } from 'react-native';

import { Header } from '../../components/Header';
import { IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export function Padrinho() {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [users, setUser] = React.useState<IUserDtos[]>([]);
  const [load, setLoad] = React.useState(true);

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

  React.useEffect(() => {
    loadUser();
  }, []);

  const handleApadrinhar = useCallback(
    async ({ user_id, nome }) => {
      console.log(user_id, nome);
      await api
        .post('/user/create-padrinho', {
          user_id: user.id,
          apadrinhado_name: nome,
          apadrinhado_id: user_id,
          qnt: 0,
        })
        .then(h => {
          Alert.alert('Sucesso!', `membro ${nome} foi apadrinhado`);
          loadUser();
        })
        .catch(h => console.log('erro no padrinho', h));
    },
    [loadUser, user],
  );

  return (
    <NativeBaseProvider>
      <Header />

      {/* <FlatList
        data={users}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <MembrosApadrinhado
            imageOfice={h.profile.logo}
            oficio={h.profile.workName}
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
