/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { HeaderContaponent } from '../../components/HeaderComponent';
import { Container } from './styles';
import { MembrosComponents } from '../../components/MembrosCompornents';
import { useAuth } from '../../hooks/AuthContext';
import { IProfileDto, IStars, IUserDtos } from '../../dtos';
import { Box } from '../FindMembro/styles';
import { InputCasdastro } from '../../components/InputsCadastro';
import { colecao } from '../../collection';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';

interface PropsUser {
   user: IUserDtos;
   profile: IProfileDto;
}

export function Membros() {
   const { navigate } = useNavigation();
   const { user } = useAuth();

   const [membros, setMembros] = useState<IUserDtos[]>([]);
   const [load, setLoad] = useState(true);
   const [search, setSearch] = React.useState('');

   const hanldeTransaction = useCallback(
      (user: IUserDtos) => {
         navigate('Transaction', { prestador: user });
      },
      [navigate],
   );

   const Users = React.useCallback(async () => {
      api.get('/user/list-all-user')
         .then(h => {
            const us = h.data as IUserDtos[];
            const fil = us.filter(p => p.id !== user.id);
            setMembros(fil);
         })
         .catch(h => console.log('list membros', h))
         .finally(() => setLoad(false));
   }, [user]);

   useFocusEffect(
      useCallback(() => {
         Users();
         setLoad(false);
      }, [Users]),
   );

   const users =
      search.length > 0
         ? membros.filter(h => {
              const up = h.nome.toLocaleUpperCase();
              return up.includes(search.toLocaleUpperCase());
           })
         : membros;

   const list = React.useMemo(() => {
      const us = [];
      users?.forEach(user => {
         let i = 0;
         const total = user.Stars.length === 0 ? 1 : user.Stars.length;
         let star = 0;
         const st = [];

         user.Stars.forEach((h: IStars) => {
            star += h.star;
         });
         const md = star / total;
         const value = Number(md.toFixed(0)) === 0 ? 1 : Number(md.toFixed(0));

         while (i < value) {
            i += 1;
            st.push(i);
         }

         const data = {
            ...user,
            media: value,
         };

         us.push(data);
      });

      return us;
   }, [users]);

   return (
      <>
         {load ? (
            <Loading />
         ) : (
            <Container>
               <HeaderContaponent type="tipo1" title="MEMBROS" />

               <Form>
                  <Box>
                     <InputCasdastro
                        name="find"
                        icon="search"
                        type="custom"
                        options={{ mask: '****************************' }}
                        onChangeText={setSearch}
                     />
                  </Box>
               </Form>

               <View>
                  <FlatList
                     contentContainerStyle={{ paddingBottom: 570 }}
                     data={list}
                     keyExtractor={h => h.id}
                     renderItem={({ item: h }) => (
                        <>
                           <MembrosComponents
                              star={h.media}
                              icon="necociar"
                              pres={() => hanldeTransaction(h)}
                              userName={h.nome}
                              user_avatar={h.profile.avatar}
                              oficio={h.profile.workName}
                              imageOfice={h.profile.logo}
                              // inativoPres={h..inativo}
                              // inativo={h.inativo}
                           />
                        </>
                     )}
                  />
               </View>
            </Container>
         )}
      </>
   );
}
