import { Avatar, Box, Center, HStack } from 'native-base';
import React from 'react';

import { currency } from '../../utils/mask';
import { IOrderTransaction } from '../../dtos';
import * as S from './styles';

interface IProps {
  item: IOrderTransaction;

  confirmation: () => void;
  recuse: () => void;
}

export function ListTransactionOrder({ item, confirmation, recuse }: IProps) {
  const valor = currency(String(item.valor));

  return (
    <S.Container>
      <HStack space="10">
        <Box px="4">
          <Avatar bg="#fff" />
          <S.title>{item.consumidor_name}</S.title>
        </Box>

        <Box flex="1">
          <S.text>R${valor}</S.text>
          <S.text>{item.descricao}</S.text>
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
