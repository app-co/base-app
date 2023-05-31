/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
   Alert,
   FlatList,
   KeyboardAvoidingView,
   Modal,
   ScrollView,
   TouchableOpacity,
   View,
} from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Box, Text, TextArea } from 'native-base';
import { HeaderContaponent } from '../../components/HeaderComponent';
import {
   BoxButton,
   BoxInput,
   BoxModal,
   Container,
   Input,
   TextButon,
   Title,
} from './styles';

import { IProfileDto, IStars, IUserDto, IUserDtos } from '../../dtos';
import { MembrosComponents } from '../../components/MembrosCompornents';
import { useAuth } from '../../hooks/AuthContext';
import { InputCasdastro } from '../../components/InputsCadastro';
import theme from '../../global/styles/theme';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';

export function Indicacoes() {
   const { user } = useAuth();
   const { nome, id } = user;

   const { navigate } = useNavigation();
   const [modal, setModal] = useState(false);
   const [load, setLoad] = React.useState(true);

   // const [users, setUsers] = useState<IUserDto[]>([]);
   const [descricao, setDescricao] = useState('');
   const [userId, setUserId] = useState('');
   const [indicadoName, setIndicadoName] = useState('');
   const [nomeCliente, setNomeCliente] = useState('');
   const [telefoneCliente, setTelefoneCliente] = useState('');
   const [value, setValue] = useState('');
   const [membros, setMembros] = useState<IUserDtos[]>();
   const [expoToken, setExpoToken] = React.useState('');

   const loadUser = React.useCallback(async () => {
      api.get('/user/list-all-user')
         .then(h => {
            const us = h.data as IUserDtos[];
            const rs = us.filter(h => h.id !== id);
            setMembros(rs);
         })
         .catch(h => console.log('list membros', h.response.data))
         .finally(() => setLoad(false));
   }, [id]);

   useFocusEffect(
      useCallback(() => {
         loadUser();
         setLoad(false);
      }, [loadUser]),
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
      users?.forEach(user => {
         const total = user.Stars.length === 0 ? 1 : user.Stars.length;
         let star = 0;

         user.Stars.forEach((h: IStars) => {
            star += h.star;
         });
         const md = star / total;
         const value = Number(md.toFixed(0)) === 0 ? 1 : Number(md.toFixed(0));

         const data = {
            ...user,
            media: value,
         };

         us.push(data);
      });

      return us;
   }, [users]);

   const sendPushNotification = useCallback(async () => {
      const message = {
         to: expoToken,
         sound: 'default',
         title: 'VOCE FOI INDICADO',
         body: `Membro do geb ${user.nome} está indicando você para prestar um serviço`,
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(message),
      });
   }, [expoToken, user.nome]);

   const OpenModal = useCallback(
      (user_id: string, nome: string, token: string) => {
         setUserId(user_id);
         setIndicadoName(nome);
         setExpoToken(token);
         setModal(true);
      },
      [],
   );

   const handleOrderIndicaçao = useCallback(async () => {
      setModal(false);

      api.post('/');

      const dados = {
         indicado_id: userId,
         indicado_name: indicadoName,
         quemIndicou_id: id,
         quemIndicou_name: nome,
         client_name: nomeCliente,
         description: descricao,
         phone_number_client: Number(telefoneCliente),
      };

      await api
         .post('/indication/create-indication', dados)
         .then(h => {
            Alert.alert('Indicação', `Aguarde a validação da ${indicadoName}`, [
               {
                  text: 'Ok',
                  onPress: () => {
                     sendPushNotification();
                     navigate('INÍCIO');
                  },
               },
            ]);
         })
         .catch(h => console.log('indication', h.response.data));
   }, [
      userId,
      indicadoName,
      id,
      nome,
      nomeCliente,
      descricao,
      telefoneCliente,
      sendPushNotification,
      navigate,
   ]);

   if (!membros) {
      return <Loading />;
   }

   return (
      <Container>
         <HeaderContaponent title="Indicar um membro" type="tipo1" />

         <Form>
            <Box mt="5">
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

         <FlatList
            data={list}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
               <MembrosComponents
                  star={h.media}
                  imageOfice={h.profile.logo}
                  oficio={h.profile.workName}
                  user_avatar={h.profile.avatar}
                  icon="indicar"
                  userName={h.nome}
                  pres={() => OpenModal(h.id, h.nome, h.token)}
                  // inativoPres={h.inativo}
                  // inativo={h.inativo}
               />
            )}
         />

         <Modal
            onRequestClose={() => setModal(false)}
            visible={modal}
            animationType="slide"
            // transparent
         >
            <BoxModal>
               <ScrollView>
                  <Box>
                     <TouchableOpacity
                        onPress={() => setModal(false)}
                        style={{
                           backgroundColor: theme.colors.focus_second,
                           borderRadius: 10,
                           padding: 10,
                           width: 100,
                        }}
                     >
                        <Text>FECHAR</Text>
                     </TouchableOpacity>
                  </Box>
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                     }}
                  >
                     <Title>Descriçao</Title>
                     <Title>{descricao.length}/100</Title>
                  </View>
                  <TextArea
                     borderRadius={10}
                     maxLength={100}
                     value={descricao}
                     onChangeText={h => setDescricao(h)}
                     fontFamily={theme.fonts.regular}
                     fontSize={14}
                  />

                  <BoxInput>
                     <Input
                        placeholder="Nome do cliente"
                        onChangeText={setNomeCliente}
                        value={nomeCliente}
                     />
                  </BoxInput>

                  <BoxInput>
                     <Input
                        keyboardType="numeric"
                        placeholder="telefone do cliente"
                        onChangeText={setTelefoneCliente}
                        value={telefoneCliente}
                     />
                  </BoxInput>

                  <BoxButton onPress={handleOrderIndicaçao}>
                     <TextButon>enviar</TextButon>
                  </BoxButton>
               </ScrollView>
            </BoxModal>
         </Modal>
      </Container>
   );
}
