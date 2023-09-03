/* eslint-disable react/require-default-props */
import * as Ico from 'phosphor-react-native';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cor } from '@/styles/cor';

import * as S from './styles';

interface IProps {
  title?: string;
  variant?: S.TVariant;
}

export function Menu({ title, variant = 'gray' }: IProps) {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 22;
  return (
    <S.Container variant={variant} style={{ paddingTop }}>
      <TouchableOpacity style={{ padding: 3 }}>
        <Ico.List size={35} color={cor.light.black} weight="duotone" />
      </TouchableOpacity>

      <S.title>{title}</S.title>
    </S.Container>
  );
}
