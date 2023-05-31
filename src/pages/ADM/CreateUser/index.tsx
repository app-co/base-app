/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
   ActivityIndicator,
   Alert,
   FlatList,
   Modal,
   ScrollView,
   TouchableOpacity,
   View,
} from 'react-native';

import * as Yup from 'yup';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import { Center, Text, Box as Content } from 'native-base';
import { Box, BoxAdm, BxPadrinho, Container, Logo, Title } from './styles';
import { useAuth } from '../../../hooks/AuthContext';
import { Button } from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationsErrors';
import theme from '../../../global/styles/theme';
import { InputCasdastro } from '../../../components/InputsCadastro';
import { ToglleRamo } from '../../../components/ToglleRamo';
import { MembroLista } from '../../../components/MembroLista';
import { ToglleEnquadramento } from '../../../components/ToglleEnquadramento';
import { IUserDto } from '../../../dtos';
import { HeaderContaponent } from '../../../components/HeaderComponent';
import { api } from '../../../services/api';

interface FormData {
   nome: string;
   workName: string;
   membro: string;
   senha: string;
   whats: string;
   CNPJ: string;
   email: string;
   ramo: string;
   enquadramento: string;
   CPF: string;
   adm: true;
}

export function SingUp() {
   const { navigate } = useNavigation();
   const formRef = useRef<FormHandles>(null);
   const { user } = useAuth();

   const [adm, setAdm] = useState(false);
   const [idAdm, setIsAdm] = useState('user');
   const [er, setErr] = useState();
   const [response, setResponse] = useState<IUserDto[]>([]);
   const [loading, setLoading] = useState(false);

   // TODO MODAL
   const [modal, setModal] = useState(false);
   const [modalRamo, setModalRamo] = useState(false);
   const [enquadramento, setEnquadramento] = useState('');
   const [ramo, setRamo] = useState('');
   const [modalUser, setModalUser] = useState(false);
   const [idUserModal, setIdUserModal] = useState('');
   const [nomeUserModa, setNomeUserModal] = useState('');
   const modalizeRefRamo = useRef<Modalize>(null);
   const modalizeRefEnquadramento = useRef<Modalize>(null);

   const [padre, setPadre] = useState(0);

   const OpenModalUser = useCallback(() => {
      setModalUser(true);
   }, []);

   const CloseModalUser = useCallback((id: string, nome: string) => {
      setIdUserModal(id);
      setNomeUserModal(nome);
      setModalUser(false);
   }, []);

   // TODO RESTO

   const handleSubmit = useCallback(
      async (data: FormData) => {
         try {
            formRef.current?.setErrors({});
            console.log(data);

            const shema = Yup.object().shape({
               nome: Yup.string().required('Nome obrigatorio'),
               membro: Yup.string().required('membro obrigatório'),
               senha: Yup.string().min(4, 'Senha no minimo 6 digitos'),
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            const dados = {
               ...data,
               adm,
            };

            await api
               .post('/user/create-user', dados)
               .then(h => {
                  Alert.alert('Usuário cadastrado');
                  navigate('INÍCIO');
               })
               .catch(h => {
                  console.log('erro para criar usuario', h);
                  Alert.alert('Erro', h.response.data.message);
               });
         } catch (err: any) {
            console.log('erro ao criar usuario', err);
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
               Alert.alert('Cadastro', err.message);
            }
         }
      },
      [adm, enquadramento, idUserModal, navigate, nomeUserModa, ramo],
   );

   const handleAdm = useCallback(() => {
      setAdm(true);
      setIsAdm('adm');
   }, []);

   const handleUser = useCallback(() => {
      setAdm(false);
      setIsAdm('user');
   }, []);

   const listAllUsers = React.useCallback(async () => {
      await api
         .get('user/list-all-user')
         .then(h => {
            const us = h.data;
            setResponse(us);
         })
         .catch(h => {
            console.log('erro ao listar usuarios');
         });
   }, []);

   useFocusEffect(
      useCallback(() => {
         listAllUsers();
      }, []),
   );

   return (
      <Container>
         <HeaderContaponent type="tipo1" title="Dados cadastrais" />

         <Modalize ref={modalizeRefRamo}>
            <ToglleRamo selectItem={(item: string) => SelectItemRamo(item)} />
         </Modalize>

         <Modalize ref={modalizeRefEnquadramento} snapPoint={530}>
            <ToglleEnquadramento
               selectItem={(item: string) => SelectItemEnquadramento(item)}
            />
         </Modalize>

         <Modal animationType="fade" visible={modalUser}>
            <View style={{ flex: 1 }}>
               <FlatList
                  data={response}
                  keyExtractor={h => h.id}
                  renderItem={({ item: h }) => (
                     <>
                        <MembroLista
                           closeModal={() =>
                              CloseModalUser(h.user.id, h.user.nome)
                           }
                           nome={h.user.nome}
                           avatar={h.profile.avatar}
                        />
                     </>
                  )}
               />
            </View>
         </Modal>

         <View
            style={{
               flexDirection: 'row',
               alignSelf: 'center',
               marginBottom: 10,
               marginTop: 20,
            }}
         >
            <Title>adm</Title>
            <BoxAdm isAdm={idAdm === 'adm'} onPress={handleAdm} />
            <Title style={{ marginLeft: 40 }}>usuário</Title>
            <BoxAdm isAdm={idAdm === 'user'} onPress={handleUser} />
         </View>

         <BxPadrinho onPress={OpenModalUser}>
            {nomeUserModa ? (
               <Title>padrinho: {nomeUserModa} </Title>
            ) : (
               <Title>Escolher padrinho</Title>
            )}
         </BxPadrinho>

         <Form ref={formRef} onSubmit={handleSubmit}>
            <Box>
               <View>
                  <Title>NOME COMPLETO</Title>
                  <InputCasdastro
                     name="nome"
                     type="custom"
                     options={{ mask: '******************' }}
                     icon="user"
                  />
               </View>

               <View>
                  <Title>MEMBRO</Title>
                  <InputCasdastro
                     name="membro"
                     type="custom"
                     options={{
                        mask: '**************************************************',
                     }}
                     icon="user"
                  />
               </View>

               <View>
                  <Title>SENHA</Title>
                  <InputCasdastro
                     name="senha"
                     autoCapitalize="none"
                     type="custom"
                     options={{ mask: '******************' }}
                     icon="user"
                  />
               </View>
            </Box>
         </Form>
         <Center p="2" alignSelf="center" mt="10" w="200">
            {loading ? (
               <ActivityIndicator size="large" />
            ) : (
               <TouchableOpacity
                  onPress={() => {
                     formRef.current.submitForm();
                  }}
               >
                  <Content>
                     <Text fontSize={20} bold>
                        Cadastrar
                     </Text>
                  </Content>
               </TouchableOpacity>
            )}
         </Center>
      </Container>
   );
}
