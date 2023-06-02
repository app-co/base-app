import { Avatar, Box, Center, HStack } from 'native-base';
import React from 'react';

import * as S from './styles';

interface IProps {
  name: string;
  description: string;

  confirmation: () => void;
  recuse: () => void;
}

export function ListB2bOrder({
  name,
  description,
  confirmation,
  recuse,
}: IProps) {
  return (
    <S.Container>
      <HStack space="10">
        <Box px="4">
          <Avatar bg="#fff" />
          <S.title>{name}</S.title>
        </Box>

        <Box flex="1">
          <S.text>{description}</S.text>
        </Box>
      </HStack>

      <Center mt="4">
        <HStack space={8}>
          <S.recusar onPress={recuse}>
            <S.buttonText>RECUSAR</S.buttonText>
          </S.recusar>
          <S.confirm onPress={confirmation}>
            <S.buttonText>CONFIRMAR</S.buttonText>
          </S.confirm>
        </HStack>
      </Center>
    </S.Container>
  );
}
