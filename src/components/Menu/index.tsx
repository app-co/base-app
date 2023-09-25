/* eslint-disable react/require-default-props */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Ico from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface IProps {
  title?: string;
  variant?: S.TVariant;
}

export function Menu({ title, variant = 'gray' }: IProps) {
  const insets = useSafeAreaInsets();
  const { dispatch } = useNavigation();

  const paddingTop = insets.top + 22;
  return (
    <S.Container variant={variant} style={{ paddingTop }}>
      <TouchableOpacity
        onPress={() => dispatch(DrawerActions.openDrawer())}
        style={{ padding: 3 }}
      >
        <Ico.List size={40} color={cor.light.black} weight="duotone" />
      </TouchableOpacity>

      <S.title>{title}</S.title>
    </S.Container>
  );
}
