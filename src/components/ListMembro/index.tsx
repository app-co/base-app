/* eslint-disable react/require-default-props */
import { Box } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import {
  AvatarMembro,
  BoxButton,
  ButtonPresensa,
  Container,
  Title,
  TitleButton,
  TitleData,
} from './styles';

type Props = {
  data?: string;
  nome: string;
  avatar: string;
  pres: () => void;
  descartar: () => void;
  confirmar: 'Confirmar' | 'Excluir';
};

export function ListMembro({
  data,
  nome,
  avatar,
  pres,
  descartar,
  confirmar,
}: Props) {
  return (
    <Container>
      <AvatarMembro source={{ uri: avatar }} />
      <View style={{ width: '70%' }}>
        <Title>{nome}</Title>
        <TitleData>{data}</TitleData>

        <BoxButton>
          <ButtonPresensa onPress={descartar} type="2">
            <TitleButton>DELETAR</TitleButton>
          </ButtonPresensa>
          <ButtonPresensa onPress={pres} type="1">
            <TitleButton>APROVAR</TitleButton>
          </ButtonPresensa>
        </BoxButton>
      </View>
    </Container>
  );
}
