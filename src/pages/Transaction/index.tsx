/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Avatar, Box, Center, HStack, TextArea } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { IUserDtos } from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { _currency, _number } from '../../utils/mask';
import * as S from './styles';

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

  const valor =
    value.length < 6 ? Number(_number(`${value},00`)) : Number(_number(value));

  const navigateToOk = useCallback(async () => {
    if (value === '') {
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
      valor,
    };

    await api.post('/consumo/order-transaction', dados);

    navigate('sucess', { prestador, description });
  }, [value, description, prestador, user.nome, user.id, valor, navigate]);

  return (
    <S.Container>
      <Header type="goback" />

      <Box>
        <S.Title style={{ marginBottom: 30, textAlign: 'center' }}>
          Vocẽ está consumindo de: {prestador.nome}, da empresa{' '}
          {prestador.profile.workName}
        </S.Title>

        <S.box>
          <HStack alignItems="center" justifyContent="space-between" w="full">
            <Avatar
              alignSelf="center"
              size="xl"
              source={{ uri: user?.profile?.avatar }}
            />

            <HStack
              alignItems="center"
              justifyContent="space-between"
              space={1}
              flex="1"
            >
              <AntDesign name="caretright" size={RFValue(18)} />

              <Center>
                <S.Title>{_currency(String(valor))}</S.Title>
              </Center>

              <AntDesign name="caretright" size={RFValue(18)} />
            </HStack>

            <Avatar
              alignSelf="center"
              size="xl"
              source={{ uri: prestador.profile?.avatar }}
            />
          </HStack>
        </S.box>
      </Box>

      <ScrollView>
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

            <Form>
              <Input
                name="value"
                keyboardType="numeric"
                onChangeText={text => setValue(_currency(text))}
                multiline
                value={value}
                placeholder="Valor consumido R$"
              />
            </Form>
          </S.BoxInput>

          <S.Buton onPress={navigateToOk}>
            <S.Title style={{ color: theme.colors.text_secundary }}>
              Enviar
            </S.Title>
          </S.Buton>
        </View>
      </ScrollView>
    </S.Container>
  );
}
