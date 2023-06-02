/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AntDesign, Feather } from '@expo/vector-icons';
import fire from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Image } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Box,
  BoxImage,
  BoxInput,
  ButonImage,
  Button,
  Container,
  Input,
  TexBoton,
} from './styled';

export function Post() {
  const { goBack } = useNavigation();
  const { user } = useAuth();

  const [img, setImage] = useState('');
  const [descricao, setDescricao] = useState('');
  const [load, setLoad] = useState(false);

  const ImagePicker = useCallback(async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (img === 'of') {
      Alert.alert('Erro', 'Escolha uma imagem para realizar o post');
      return;
    }
    setLoad(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/image/${fileName}.png`);

    await reference.putFile(img);
    const photoUrl = await reference.getDownloadURL();

    const dados = {
      description: descricao,
      image: photoUrl,
      fk_id_user: user.id,
      like: 0,
    };

    await api
      .post('/post', dados)
      .then(h => {})
      .catch(h => {
        console.log('erro na tela para criar post', h);
        Alert.alert('Post', 'post criado com sucesso!');
      });
    setLoad(false);
    goBack();
  }, [descricao, goBack, img, user]);

  // if (load) {
  //    return <Loading />;
  // }

  return (
    <Container>
      <Header />
      <Box>
        <BoxInput>
          <Input onChangeText={setDescricao} placeholder="Descrição do poste" />
        </BoxInput>

        <ButonImage onPress={ImagePicker}>
          <TexBoton style={{ fontSize: RFValue(16) }}>Escolher image</TexBoton>
        </ButonImage>

        <BoxImage>
          {img !== '' ? (
            <Image
              w="full"
              h="full"
              alt="image poste"
              resizeMode="contain"
              source={{ uri: img }}
            />
          ) : (
            <Feather name="image" size={100} />
          )}
        </BoxImage>

        <Button enabled={!load} onPress={handleSubmit}>
          {load ? <ActivityIndicator /> : <TexBoton>Criar</TexBoton>}
        </Button>
      </Box>
    </Container>
  );
}
