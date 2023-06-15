import { Avatar, Box, Center, HStack } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import * as S from './styles';

interface IProps {
  name: string;
  description: string;

  confirmation: () => void;
  recuse: () => void;
  load: boolean;
}

export function ListB2bOrder({
  name,
  description,
  confirmation,
  recuse,
  load = false,
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
          <S.recusar disabled={load} onPress={recuse}>
            {load ? (
              <ActivityIndicator />
            ) : (
              <S.buttonText>RECUSAR</S.buttonText>
            )}
          </S.recusar>
          <S.confirm disabled={load} onPress={confirmation}>
            {load ? (
              <ActivityIndicator />
            ) : (
              <S.buttonText>CONFIRMAR</S.buttonText>
            )}
          </S.confirm>
        </HStack>
      </Center>
    </S.Container>
  );
}
