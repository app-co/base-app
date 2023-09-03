import { Box, Center, HStack } from 'native-base';

import React from 'react';

import { cor } from '@/styles/cor';

import * as S from './styles';

export function UserList() {
  return (
    <S.Container>
      <HStack>
        <Box w="16" p="2">
          <S.title>dia</S.title>
          <S.title>hora</S.title>
        </Box>

        <Box p="2">
          <S.title>cliente</S.title>
          <S.title>serviço</S.title>
        </Box>
      </HStack>

      <S.line />
    </S.Container>
  );
}
