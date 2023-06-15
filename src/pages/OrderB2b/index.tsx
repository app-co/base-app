/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextArea } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { useB2b } from '../../contexts/b2b';
import { useToken } from '../../contexts/Token';
import { IUserDtos } from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styles';

interface IRoute {
  prestador: IUserDtos;
}

export function OrderB2b() {
  const { navigate, reset, goBack } = useNavigation();
  const { b2bCreate } = useB2b();
  const { sendMessage } = useToken();
  const { user } = useAuth();
  const route = useRoute();
  const { prestador } = route.params as IRoute;

  const [description, setDescription] = useState('');
  const [load, setLoad] = React.useState(false);

  const navigateToOk = useCallback(async () => {
    if (!description) {
      Alert.alert('Transação', 'informe uma descrição ');
      return;
    }

    setLoad(true);

    const dados = {
      send_id: user.id,
      send_name: user.nome,
      recevid_id: prestador.id,
      recevid_name: prestador.nome,
      appointment: new Date(),
      validate: false,
      assunto: description,
    };

    await b2bCreate(dados)
      .then(h => {
        sendMessage({
          title: 'B2B',
          token: prestador.token,
          text: `Você realizou um B2B COM ${prestador.nome}?`,
        });
        setLoad(false);

        goBack();
      })
      .catch(h => {
        console.log(h);
        setLoad(false);
      });

    // await api
    //   .post('/b2b/create-b2b', dados)
    //   .then(h => {
    //     Alert.alert('Sua solicitação foi enviada com sucesso!');
    //     goBack();
    //   })
    //   .catch(h => console.log('b2b', h.response.data));
  }, [
    b2bCreate,
    description,
    prestador.id,
    prestador.nome,
    user.id,
    user.nome,
  ]);

  return (
    <S.Container>
      <ScrollView>
        <Header />
        <S.Box>
          <S.Title>Vocẽ irá realizar um B2B com:</S.Title>
          <S.Title>
            {prestador?.nome}
            {prestador?.profile.workName}
          </S.Title>
          <S.BoxElement>
            <S.BoxAvatar>
              {user.profile.avatar ? (
                <S.Avatar source={{ uri: user.profile.avatar }} />
              ) : (
                <Feather name="user" size={60} color={theme.colors.focus} />
              )}
            </S.BoxAvatar>

            <S.content>
              <AntDesign name="caretright" size={RFValue(18)} />
              <AntDesign name="caretright" size={RFValue(18)} />
            </S.content>

            <S.office>
              <>
                {user.profile.logo ? (
                  <S.ImageOfice source={{ uri: user.profile.logo }} />
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

                {prestador?.profile?.logo ? (
                  <S.ImageProviderOfice
                    source={{ uri: prestador?.profile?.logo }}
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
              </>
            </S.office>

            <S.BoxProvider>
              {prestador?.profile?.avatar ? (
                <S.Avatar source={{ uri: prestador?.profile?.avatar }} />
              ) : (
                <Feather name="user" size={60} color={theme.colors.focus} />
              )}
            </S.BoxProvider>
          </S.BoxElement>
        </S.Box>

        <View style={{ paddingBottom: 50 }}>
          <S.BoxInput
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
          </S.BoxInput>

          <S.Buton disabled={load} onPress={navigateToOk}>
            {load ? (
              <ActivityIndicator />
            ) : (
              <S.Title style={{ color: theme.colors.text_secundary }}>
                Enviar
              </S.Title>
            )}
          </S.Buton>
        </View>
      </ScrollView>
    </S.Container>
  );
}
