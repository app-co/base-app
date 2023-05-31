/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import { NativeBaseProvider, Text, Box, Center } from 'native-base';
import { Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/AuthContext';
import { HeaderContaponent } from '../../components/HeaderComponent';
import theme from '../../global/styles/theme';
import { api } from '../../services/api';
import { Loading } from '../../components/Loading';
import { MembrosApadrinhado } from '../../components/MembrosApadrinhado';
import { IUserDtos } from '../../dtos';

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
         .catch(h =>
            console.log('erro ao carregar user na tela te padrinho', h),
         )
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

   if (load) {
      return <Loading />;
   }

   return (
      <NativeBaseProvider>
         <HeaderContaponent type="tipo1" title="APDRINHAMENTO" />

         <FlatList
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
         />
      </NativeBaseProvider>
   );
}
