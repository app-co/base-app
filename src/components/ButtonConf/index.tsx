/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { cor } from '@/styles/cor';

import * as S from './styles';

interface IProps extends TouchableOpacityProps {
  title?: string;
  load: boolean;
}

export function ButtonConf({ title = 'SALVAR', load, ...rest }: IProps) {
  return (
    <S.Container
      disabled={load}
      style={{
        shadowColor: '#ffffff',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,

        elevation: 10,
      }}
      {...rest}
    >
      {load ? (
        <ActivityIndicator color={cor.light['glow-a']} size={36} />
      ) : (
        <S.title>{title}</S.title>
      )}
    </S.Container>
  );
}
