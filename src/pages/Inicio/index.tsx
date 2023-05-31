/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Avatar, Box, Center, HStack, ScrollView, Text } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';

// import * as Updates from 'expo-updates';

import { Header } from '../../components/Header';
import {
  IB2b,
  IIndicationDto,
  IOrderTransaction,
  ITransaction,
} from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { Classificacao } from '../Classificacao';
import * as S from './styles';

const wt = Dimensions.get('window').width;

export function Inicio() {
  const { user } = useAuth();
  const navigate = useNavigation();

  return (
    <S.Container>
      <Header />
      <Center mt="16">
        <Avatar size="2xl" source={{ uri: user?.profile.avatar }} />
        <S.TitleName>{user.nome}</S.TitleName>
      </Center>

      <View style={{ alignItems: 'center' }}>
        <S.ComprasText>Minhas Vendas</S.ComprasText>

        <S.BoxPrice>
          <S.TitlePrice>0</S.TitlePrice>
          <S.TitleP>0 pts</S.TitleP>
        </S.BoxPrice>
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Text style={{ marginLeft: 16 }}>Vendas do G.E.B 0</Text>
      </View>

      <S.Line />
      <Classificacao />
    </S.Container>
  );
}
