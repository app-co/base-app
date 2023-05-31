/* eslint-disable camelcase */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import fire from '@react-native-firebase/firestore';
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

type UserProps = {
   user: IUserDtos;
   profile: IProfileDto;
};

export function B2B() {
   const { navigate } = useNavigation();
   const { user } = useAuth();

   const [value, setValue] = useState('');
   const [membros, setMembros] = useState<IUserDtos[]>([]);
   const [load, setLoad] = useState(true);

   const hanldeTransaction = useCallback(
      (prestador: IUserDtos) => {
         navigate('orderB2b', { prestador });
      },
      [navigate],
   );

   const Users = React.useCallback(async () => {
      api.get('/user/list-all-user')
         .then(h => {
            const us = h.data as IUserDtos[];
            const res = us.filter(p => p.id !== user.id);
            setMembros(res);
         })
         .catch(h => console.log('b2b', h.response.data.message))
         .finally(() => setLoad(false));
   }, [user]);

   useFocusEffect(
      useCallback(() => {
         Users();
         setLoad(false);
      }, [Users]),
   );

   const users =
      value.length > 0
         ? membros.filter(h => {
              const up = h.nome.toLocaleUpperCase();
              return up.includes(value.toLocaleUpperCase());
           })
         : membros;

   const list = React.useMemo(() => {
      const us = [];
      users.forEach(user => {
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
               <HeaderContaponent type="tipo1" title="B2B" />

               <Form>
                  <Box>
                     <InputCasdastro
                        name="find"
                        icon="search"
                        type="custom"
                        options={{ mask: '****************************' }}
                        onChangeText={text => setValue(text)}
                        value={value}
                     />
                  </Box>
               </Form>

               <View style={{ paddingBottom: 350 }}>
                  <FlatList
                     data={list}
                     keyExtractor={h => h.id}
                     renderItem={({ item: h }) => (
                        <>
                           <MembrosComponents
                              star={h.media}
                              icon="b2b"
                              pres={() => hanldeTransaction(h)}
                              userName={h.nome}
                              user_avatar={h.profile.avatar}
                              oficio={h.profile.workName}
                              imageOfice={h.profile.logo}
                              // inativoPres={h.profile.inativo}
                              // inativo={h.profile.inativo}
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
