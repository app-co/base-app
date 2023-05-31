/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import {
   TextInputMaskTypeProp,
   TextInputMaskProps,
   TextInputMask,
} from 'react-native-masked-text';

import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import {
   ActivityIndicator,
   Alert,
   ScrollView,
   TouchableOpacity,
   View,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Box as BoxBase, Text } from 'native-base';

import { Modalize } from 'react-native-modalize';
import { Form } from '@unform/mobile';

import * as ImagePiker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/AuthContext';
import {
   Avatar,
   Box,
   BoxButton,
   BoxCamera,
   BoxFormularios,
   BoxInput,
   BoxLogo,
   BoxTogle,
   Camera,
   Container,
   LogoImage,
   TextTogle,
   TitleButton,
   TitleHeader,
} from './styles';
import { ToglleRamo } from '../../components/ToglleRamo';
import { IUserDtos } from '../../dtos';
import { InputCasdastro } from '../../components/InputsCadastro';
import { Input } from '../../components/Inputs';
import { HeaderContaponent } from '../../components/HeaderComponent';
import { ToglleEnquadramento } from '../../components/ToglleEnquadramento';
import { colecao } from '../../collection';
import { api } from '../../services/api';
import { Line } from '../../components/MembroLista/styles';

export function Profile() {
   const cpfRef = useRef(null);
   const whatsRef = useRef(null);
   const cnpfRef = useRef(null);

   const { user, updateUser, signOut } = useAuth();
   const { navigate, goBack } = useNavigation();
   const formRef = useRef<FormHandles>(null);
   const modalizeRefRamo = useRef<Modalize>(null);
   const modalizeRefEnquadramento = useRef<Modalize>(null);

   const [loading, setLoading] = useState(true);
   const [load, setLoad] = React.useState(false);

   // TODO USER
   const [avatar, setAvatar] = useState('');
   const [logo, setLogo] = useState('');

   // TODO FORMULARIOS
   const [nome, setNome] = useState(user.nome);
   const [whats, setWhats] = useState(user.profile.whats);
   const [email, setEmail] = useState(user.nome);
   const [workName, setWorkName] = useState(user.profile.workName);
   const [CPF, setCpf] = useState(user.profile.CPF);
   const [cnpj, setCnpj] = useState(user.profile.CNPJ);
   const [linkSite, setLinkSite] = useState(null);
   const [linkF, setLinkF] = useState(null);
   const [linkI, setLinkI] = useState(null);
   const [linkMaps, setLinkMaps] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState(user.profile.avatar);
   const [logoUrl, setLogorUrl] = useState(user.profile.logo);

   // TODO MODAL
   const [ramo, setRamo] = useState(user.profile.ramo);
   const [enquadramento, setEnquadramento] = useState(
      user.profile.enquadramento,
   );
   const [modal, setModal] = useState(false);

   const handleModalOpenRamo = useCallback(() => {
      modalizeRefRamo.current?.open();
      setModal(!modal);
   }, [modal]);

   const handleModalOpenEnquadramento = useCallback(() => {
      modalizeRefEnquadramento.current?.open();
   }, []);

   const SelectItemRamo = useCallback(
      (item: string) => {
         setRamo(item);
         setModal(!modal);

         modalizeRefRamo.current?.close();
      },
      [modal],
   );

   const SelectItemEnquadramento = useCallback((item: string) => {
      setEnquadramento(item);
      modalizeRefEnquadramento.current?.close();
   }, []);

   const handleImagePiker = useCallback(async () => {
      setLoading(true);

      const result = await ImagePiker.launchImageLibraryAsync({
         mediaTypes: ImagePiker.MediaTypeOptions.All,
         allowsEditing: true,
         quality: 1,
      });

      if (result.cancelled) {
         setLoading(false);
      }
      if (!result.cancelled) {
         setAvatar(result.uri);

         try {
            const ref = storage().ref(`image/avatar/${user.id}.png`);
            console.log(ref.path);
            await ref.delete();
         } catch (error) {
            console.log(error);
         }

         const reference = storage().ref(`/image/avatar/${user.id}.png`);

         await reference.putFile(result.uri);
         const photoUrl = await reference.getDownloadURL();
         setAvatarUrl(photoUrl);
      }
   }, [user]);

   const handleLogo = useCallback(async () => {
      setLoading(true);
      const { status } = await ImagePiker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
         const result = await ImagePiker.launchImageLibraryAsync({
            mediaTypes: ImagePiker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
         });

         if (result.cancelled) {
            setLoading(false);
         }

         if (!result.cancelled) {
            setLogo(result.uri);

            try {
               const ref = storage().ref(`image/logo/${user.id}.png`);
               await ref.delete();
            } catch (error) {
               console.log(error);
            }
            const reference = storage().ref(`/image/logo/${user.id}.png`);

            await reference.putFile(result.uri);
            const photoUrl = await reference.getDownloadURL();
            setLogorUrl(photoUrl);
         }
      }

      setLoading(false);
   }, [user]);

   const handleSubmit = useCallback(async () => {
      formRef.current?.setErrors({});
      setLoad(true);

      const dados = {
         whats,
         workName,
         CNPJ: cnpj,
         CPF,
         email,
         enquadramento,
         ramo,
         fk_id_user: user.id,
         logo: logoUrl,
         avatar: avatarUrl,
      };

      try {
         await api
            .put('user/update-profile', dados)
            .then(() => {
               Alert.alert('Seu perfil foi atualizado com sucesso!');
               const dt = {
                  ...user,
                  profile: dados,
               };
               updateUser(dt);
            })
            .finally(() => {
               setLoad(false);
               goBack();
            });
      } catch (err) {
         Alert.alert('Erro ao atualizar seu perfil', err.response.data.message);
      }
   }, [
      CPF,
      avatarUrl,
      cnpj,
      email,
      enquadramento,
      goBack,
      logoUrl,
      ramo,
      updateUser,
      user,
      whats,
      workName,
   ]);

   useEffect(() => {
      const mo = whatsRef.current?.getRawValue();
      setWhats(mo);
   }, [whats]);

   return (
      <Container>
         <Modalize ref={modalizeRefRamo} snapPoint={530}>
            <ToglleRamo selectItem={(item: string) => SelectItemRamo(item)} />
         </Modalize>

         <Modalize ref={modalizeRefEnquadramento} snapPoint={530}>
            <ToglleEnquadramento
               selectItem={(item: string) => SelectItemEnquadramento(item)}
            />
         </Modalize>
         <HeaderContaponent type="tipo1" title="MEU PERFIL" />

         <View
            style={{
               height: RFPercentage(80),
            }}
         >
            <ScrollView
               contentContainerStyle={{
                  paddingTop: RFValue(10),
                  paddingBottom: RFValue(30),
               }}
            >
               <Box>
                  <Avatar
                     style={{ resizeMode: 'cover' }}
                     source={{
                        uri: avatar !== '' ? avatar : user.profile.avatar,
                     }}
                  />
                  <BoxCamera onPress={handleImagePiker}>
                     <Camera name="camera" />
                  </BoxCamera>
               </Box>

               <Form
                  initialData={{
                     nome: user.nome,
                     email: user.profile.email,
                     workName: user.profile.workName,
                  }}
               >
                  <BoxFormularios>
                     {/* <BoxInput>
                        <TitleHeader style={{ right: 10 }}>NOME</TitleHeader>
                        <InputCasdastro
                           icon=""
                           name="nome"
                           autoCapitalize="words"
                           type="custom"
                           options={{
                              mask: '***********************************',
                           }}
                           onChangeText={h => setNome(h)}
                           value={nome}
                        />
                     </BoxInput> */}

                     <BoxInput>
                        <TitleHeader style={{ right: 10 }}>E-MAIL</TitleHeader>
                        <InputCasdastro
                           name="email"
                           icon=""
                           autoCapitalize="none"
                           type="custom"
                           keyboardType="email-address"
                           options={{
                              mask: '**************************',
                           }}
                           onChangeText={h => setEmail(h)}
                           value={email}
                        />
                     </BoxInput>

                     <BoxBase alignSelf="flex-start" px="5">
                        <TitleHeader style={{ right: 10 }}>WHATS</TitleHeader>
                        <TextInputMask
                           type="cel-phone"
                           onChangeText={mask => {
                              setWhats(mask);
                           }}
                           ref={whatsRef}
                           value={whats!}
                        />
                        <BoxBase h="1" bg={theme.colors.focus} />
                     </BoxBase>
                  </BoxFormularios>

                  <BoxFormularios>
                     <BoxInput>
                        <TitleHeader style={{ right: 10 }}>
                           RAZÃO SOCIAL
                        </TitleHeader>
                        <InputCasdastro
                           name="workName"
                           icon=""
                           autoCapitalize="none"
                           type="custom"
                           options={{
                              mask: '********************************************************',
                           }}
                           onChangeText={h => setWorkName(h)}
                           value={workName!}
                        />
                     </BoxInput>
                     <BoxInput>
                        <TitleHeader style={{ right: 10 }}>CPF</TitleHeader>
                        <InputCasdastro
                           name="cpf"
                           icon=""
                           type="cpf"
                           onChangeText={h => setCpf(h)}
                           value={String(CPF)}
                           ref={cpfRef}
                        />
                     </BoxInput>

                     <BoxInput>
                        <TitleHeader style={{ right: 10 }}>CNPJ</TitleHeader>
                        <InputCasdastro
                           type="cnpj"
                           name="cnpj"
                           icon=""
                           onChangeText={h => setCnpj(h)}
                           value={String(cnpj)}
                           ref={cnpfRef}
                        />
                     </BoxInput>

                     <View
                        style={{
                           alignSelf: 'flex-start',
                           marginLeft: 20,
                           marginTop: 20,
                           marginBottom: 20,
                        }}
                     >
                        <TitleHeader>RAMO DE ATIVIDADE</TitleHeader>
                        <BoxTogle onPress={handleModalOpenRamo}>
                           <TextTogle>{ramo}</TextTogle>
                           <AntDesign
                              name="caretdown"
                              size={25}
                              color={theme.colors.focus}
                           />
                        </BoxTogle>
                     </View>

                     <View
                        style={{
                           alignSelf: 'flex-start',
                           marginLeft: 20,
                           marginTop: 20,
                        }}
                     >
                        <TitleHeader>ENQUADRAMENTO</TitleHeader>
                        <BoxTogle onPress={handleModalOpenEnquadramento}>
                           <TextTogle>{enquadramento}</TextTogle>
                           <AntDesign
                              name="caretdown"
                              size={25}
                              color={theme.colors.focus}
                           />
                        </BoxTogle>
                     </View>
                  </BoxFormularios>

                  {/* <BoxFormularios>
                     <TitleHeader>LINK SITE</TitleHeader>
                     <Input
                        value={linkSite}
                        onChangeText={h => setLinkSite(h)}
                        name="whatLind"
                        icon=""
                     />

                     <TitleHeader>LINK FACE</TitleHeader>
                     <Input
                        value={linkF}
                        onChangeText={h => setLinkF(h)}
                        name="linkFace"
                        icon=""
                     />

                     <TitleHeader>LINK INSTA</TitleHeader>
                     <Input
                        value={linkI}
                        onChangeText={h => setLinkI(h)}
                        name="linkInsta"
                        icon=""
                     />

                     <TitleHeader>LINK ENDEREÇO</TitleHeader>
                     <Input
                        value={linkMaps}
                        onChangeText={h => setLinkMaps(h)}
                        name="linkMap"
                        icon=""
                     />
                  </BoxFormularios> */}
               </Form>

               <View
                  style={{
                     flexDirection: 'row',
                  }}
               >
                  <BoxLogo>
                     <TitleButton style={{ textAlign: 'center' }}>
                        LOGO EMPRESA
                     </TitleButton>
                     <LogoImage source={{ uri: logoUrl }} />
                  </BoxLogo>
                  <TouchableOpacity
                     onPress={handleLogo}
                     style={{ top: RFPercentage(10), marginLeft: 20 }}
                  >
                     <TitleHeader>ALTERAR LOGO</TitleHeader>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </View>
         <BoxButton onPress={handleSubmit}>
            {load ? (
               <ActivityIndicator />
            ) : (
               <TitleButton>Atualizar</TitleButton>
            )}
         </BoxButton>
      </Container>
   );
}
