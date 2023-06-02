/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Box, HStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '../../global/styles/theme';
import { CartaMessagem } from '../CartaMessagem';
import * as S from './styles';

type lenghs = {
  b2b: number;
  transaction: number;
  indication: number;
};

interface IProps {
  type?: 'menu' | 'goback';
  title?: string;
  orders?: lenghs;
  openMail: () => void;
}

export function Header({
  title,
  orders = { b2b: 0, transaction: 0, indication: 0 },
  openMail,
  type = 'menu',
}: IProps) {
  const { dispatch, goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top;
  return (
    <S.Container style={{ paddingTop }}>
      <Box w="100%">
        <HStack alignItems="center" space="70%">
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              type === 'menu' ? dispatch(DrawerActions.openDrawer()) : goBack();
            }}
          >
            {type === 'menu' ? (
              <MaterialCommunityIcons
                name="menu"
                size={40}
                color={theme.colors.focus}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-left-thick"
                size={40}
                color={theme.colors.focus}
              />
            )}
          </TouchableOpacity>

          {orders.b2b > 0 && (
            <CartaMessagem pres={openMail} quantity={orders.b2b} />
          )}

          {orders.indication > 0 && (
            <CartaMessagem pres={openMail} quantity={orders.indication} />
          )}

          {orders.transaction > 0 && (
            <CartaMessagem pres={openMail} quantity={orders.transaction} />
          )}
        </HStack>
      </Box>
    </S.Container>
  );
}
