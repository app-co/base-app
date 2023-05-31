/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { add, format, isAfter, max } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import Firestore from '@react-native-firebase/firestore';
import { HeaderContaponent } from '../../components/HeaderComponent';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../hooks/AuthContext';
import {
   Box,
   ButtonValidar,
   Container,
   TextButtonValidar,
   Title,
} from './styles';
import { api } from '../../services/api';

type Props = {
   user_id: string;
   presenca: boolean;
   createdAt: number;
   nome: string;
   avatar: string;
};

export function Valide() {
   const { user } = useAuth();
   const { nome, id } = user;
   const { navigate } = useNavigation();
   const [data, setData] = useState(
      format(new Date(Date.now()), 'dd/MM/yyyy - HH:mm'),
   );
   const [load, setLoad] = useState(false);
   const [presenca, setPresenca] = useState<Props[]>([]);

   const hanldeValidar = useCallback(async () => {
      const dados = {
         nome,
         user_id: id,
      };

      await api
         .post('/presenca/create-order-presenca', dados)
         .then(h => {
            setLoad(false);
            navigate('INÍCIO');
            Alert.alert(
               'Solicitação enviada',
               'Aguarde um adm validar sua presença',
            );
         })
         .catch(h => {
            console.log('presenca', h.response.data);
            Alert.alert(
               'Erro ao validar sua presença',
               h.response.data.message,
            );
         });
   }, [id, navigate, nome]);

   return (
      <Container>
         <HeaderContaponent title="Valide sua presença" type="tipo1" />

         <Box>
            <Title>{data} </Title>
         </Box>

         <ButtonValidar onPress={hanldeValidar}>
            {load ? (
               <Loading />
            ) : (
               <TextButtonValidar>validar</TextButtonValidar>
            )}
         </ButtonValidar>
      </Container>
   );
}
