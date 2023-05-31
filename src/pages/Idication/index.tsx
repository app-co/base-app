import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';

import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import fire from '@react-native-firebase/firestore';
import { HeaderContaponent } from '../../components/HeaderComponent';
import {
   Box,
   BoxInput,
   BoxTextInput,
   Buton,
   Container,
   Input,
   TextBoton,
   Title,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { InputText } from '../Transaction/styles';
import { OrderNavigationIndication } from '../../@types/navigation';
import { IUserDtos } from '../../dtos';
import { colecao } from '../../collection';
import { api } from '../../services/api';

export function Indication() {
   const { user } = useAuth();
   const { quemIndicou, id } = useRoute().params as OrderNavigationIndication;
   const { reset } = useNavigation();

   const [description, setDescription] = useState('');
   const [valor, setValor] = useState('');
   const moneyRef = useRef(null);
   const [mon, setMon] = useState(0);

   const handleFecharNegocio = useCallback(async () => {
      if (!description) {
         return Alert.alert('Transação', 'Falta a descrição');
      }

      if (!valor || valor === '0.00') {
         return Alert.alert('Transação', 'Falta o valor');
      }

      const inddados = {
         indicado_id: quemIndicou,
         indication_id: id,
      };

      await api
         .put('/indication/validate-indication', inddados)
         .then(async h => {
            const dados = {
               prestador_id: user.id,
               prestador_name: user.nome,
               descricao: description,
               valor: mon,
            };

            await api
               .post('/transaction/create-transaction', dados)
               .then(h => {
                  console.log(h.data);
               })
               .catch(h => {
                  console.log(
                     'erro ao fazer a transaçao na tela de inidcation',
                     h.response.data,
                  );
                  Alert.alert(
                     'Erro ao realizar sua transação',
                     h.response.data.message,
                  );
               });
         })
         .catch(h => {
            console.log('erro ao validar a indicacao na tela de indication', h);
            Alert.alert('Erro', h.response.data.message);
         });

      reset({
         routes: [{ name: 'INÍCIO' }],
      });
   }, [description, id, mon, quemIndicou, reset, user, valor]);

   useEffect(() => {
      const mo = moneyRef.current?.getRawValue();
      setMon(mo * 100);
   }, [valor]);

   return (
      <Container>
         <HeaderContaponent title="Fechar negocio da indicação" type="tipo1" />

         <Box>
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
               }}
            >
               <Title>Descrição</Title>
               <Title>{description.length}/14</Title>
            </View>
            <BoxTextInput>
               <Input
                  onChangeText={setDescription}
                  value={description}
                  maxLength={14}
               />
            </BoxTextInput>

            <Title style={{ marginTop: 10, marginLeft: 10 }}>Valor</Title>
            <BoxInput>
               <InputText
                  type="money"
                  options={{
                     precision: 2,
                     separator: '.',
                  }}
                  keyboardType="numeric"
                  onChangeText={setValor}
                  multiline
                  value={valor}
                  placeholder="Valor consumido R$"
                  ref={moneyRef}
               />
            </BoxInput>

            <Buton onPress={handleFecharNegocio}>
               <TextBoton>ENVIAR</TextBoton>
            </Buton>
         </Box>
      </Container>
   );
}
