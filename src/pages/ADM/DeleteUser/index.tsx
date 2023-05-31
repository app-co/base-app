import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import fire from '@react-native-firebase/firestore';
import { HeaderContaponent } from '../../../components/HeaderComponent';
import { ListMembro } from '../../../components/ListMembro';

import { Container, Title } from './styles';
import { api } from '../../../services/api';
import { IProfileDto, IUserDtos } from '../../../dtos';

export function DeletUser() {
   const [respnse, setResponse] = useState<IUserDtos[]>([]);
   const { goBack } = useNavigation();

   const listAllUser = React.useCallback(async () => {
      await api
         .get('user/list-all-user')
         .then(h => {
            setResponse(h.data);
         })
         .catch(h => {
            console.log('erro ao lstar users na tela de deleteUser', h);
         });
   }, []);

   useFocusEffect(
      useCallback(() => {
         listAllUser();
      }, []),
   );

   const handleDelete = useCallback(
      async (id: string) => {
         Alert.alert('Aviso', 'você está preste a excluir um membro', [
            {
               text: 'Ok',
               onPress: async () => {
                  await api
                     .delete(`user/delete/${id}`)
                     .then(h => {})
                     .catch(h => {
                        console.log('err ao deletar usuario', h);
                        Alert.alert('Erro', h.response.data.message);
                     })
                     .finally(() => goBack());
               },
            },

            {
               text: 'Cancelar',
               style: 'cancel',
            },
         ]);
      },
      [goBack],
   );

   return (
      <Container>
         <HeaderContaponent
            title="Excluir um membro"
            onMessage="of"
            type="tipo1"
         />
         <View>
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={respnse}
               keyExtractor={h => h.id}
               renderItem={({ item: h }) => (
                  <ListMembro
                     confirmar="Excluir"
                     avatar={h.profile.avatar}
                     nome={h.nome}
                     pres={() => {
                        handleDelete(h.membro);
                     }}
                     descartar={() => {
                        goBack();
                     }}
                  />
               )}
            />
         </View>
      </Container>
   );
}
