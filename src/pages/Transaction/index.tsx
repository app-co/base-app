/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextArea } from 'native-base';
import { format } from 'date-fns';
import {
   Avatar,
   Box,
   BoxAvatar,
   Boxcons,
   BoxElement,
   BoxInput,
   BoxProvider,
   Buton,
   Container,
   ContainerInput,
   ImageOfice,
   ImageProviderOfice,
   InputText,
   Title,
} from './styles';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/AuthContext';
import { HeaderContaponent } from '../../components/HeaderComponent';
import { colecao } from '../../collection';
import { IUserDtos } from '../../dtos';
import { api } from '../../services/api';

interface IRoute {
   prestador: IUserDtos;
}

export function Transaction() {
   const { navigate } = useNavigation();
   const moneyRef = useRef(null);
   const { user } = useAuth();
   const route = useRoute();
   const { prestador } = route.params as IRoute;

   const [value, setValue] = useState('');
   const [description, setDescription] = useState('');
   const [mon, setMon] = useState(0);

   const navigateToOk = useCallback(async () => {
      if (mon === 0) {
         Alert.alert('Transação', 'informe o valor que foi consumido');
         return;
      }

      if (!description) {
         Alert.alert('Transação', 'informe uma descrição ');
         return;
      }

      const dados = {
         prestador_id: prestador.id,
         prestador_name: prestador.nome,
         consumidor_name: user.nome,
         consumidor_id: user.id,
         descricao: description,
         valor: Number(mon.toFixed()),
      };

      await api.post('/consumo/order-transaction', dados);

      navigate('sucess', { prestador, description });
   }, [mon, description, prestador, user.nome, user.id, navigate]);

   useEffect(() => {
      const mo = moneyRef.current?.getRawValue();
      setMon(mo * 100);
   }, [value]);

   return (
      <Container>
         <HeaderContaponent type="tipo1" title="" />
         <Box>
            <Title style={{ marginBottom: 30, textAlign: 'center' }}>
               Vocẽ está consumindo de: {prestador.nome}, da empresa{' '}
               {prestador.profile.workName}
            </Title>
            <BoxElement>
               <BoxAvatar>
                  {user.profile.avatar ? (
                     <Avatar source={{ uri: user.profile.avatar }} />
                  ) : (
                     <Feather
                        name="user"
                        size={60}
                        color={theme.colors.focus}
                     />
                  )}

                  {user.profile.logo ? (
                     <ImageOfice source={{ uri: user.profile.logo }} />
                  ) : (
                     <View
                        style={{
                           width: 50,
                           height: 50,
                           borderRadius: 25,
                           backgroundColor: theme.colors.focus,
                           alignSelf: 'flex-end',
                        }}
                     />
                  )}
               </BoxAvatar>

               <Boxcons>
                  <AntDesign
                     style={{ left: -30, position: 'absolute' }}
                     name="caretright"
                     size={RFValue(18)}
                  />
                  <Title style={{ fontSize: 14 }}>R${value}</Title>
                  <AntDesign
                     style={{ right: -30, position: 'absolute' }}
                     name="caretright"
                     size={RFValue(18)}
                  />
               </Boxcons>

               <BoxProvider>
                  {prestador.profile.avatar ? (
                     <Avatar source={{ uri: prestador.profile.avatar }} />
                  ) : (
                     <Feather
                        name="user"
                        size={85}
                        color={theme.colors.focus}
                     />
                  )}

                  {prestador?.profile?.logoTipo ? (
                     <ImageProviderOfice
                        source={{ uri: prestador.profile?.logoTipo }}
                     />
                  ) : (
                     <View
                        style={{
                           width: 50,
                           height: 50,
                           borderRadius: 25,
                           backgroundColor: theme.colors.focus,
                           alignSelf: 'flex-start',
                        }}
                     />
                  )}
               </BoxProvider>
            </BoxElement>
         </Box>

         <ScrollView>
            <View style={{ paddingBottom: 50 }}>
               <BoxInput
                  style={{
                     shadowColor: '#000',
                     shadowOffset: {
                        width: 0,
                        height: 3,
                     },
                     shadowOpacity: 0.57,
                     shadowRadius: 4.65,

                     elevation: 6,
                  }}
               >
                  <View>
                     <Text style={{ alignSelf: 'flex-end' }}>
                        {description.length}/100
                     </Text>
                     <TextArea
                        h="50%"
                        w="80%"
                        borderRadius={10}
                        maxLength={100}
                        value={description}
                        onChangeText={h => setDescription(h)}
                        fontFamily={theme.fonts.regular}
                        fontSize={14}
                     />
                  </View>

                  <ContainerInput>
                     <InputText
                        type="money"
                        options={{
                           precision: 2,
                           separator: '.',
                           // delimiter: ',',
                           // unit: '',
                        }}
                        keyboardType="numeric"
                        onChangeText={text => setValue(text)}
                        multiline
                        value={value}
                        placeholder="Valor consumido R$"
                        ref={moneyRef}
                     />
                  </ContainerInput>
               </BoxInput>

               <Buton onPress={navigateToOk}>
                  <Title style={{ color: theme.colors.text_secundary }}>
                     Enviar
                  </Title>
               </Buton>
            </View>
         </ScrollView>
      </Container>
   );
}
