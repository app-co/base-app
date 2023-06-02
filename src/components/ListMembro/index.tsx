/* eslint-disable react/require-default-props */
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
          <ButtonPresensa onPress={pres} type="1">
            <TitleButton>{confirmar}</TitleButton>
          </ButtonPresensa>

          <ButtonPresensa onPress={descartar} type="2">
            <TitleButton>Cancelar</TitleButton>
          </ButtonPresensa>
        </BoxButton>
      </View>
    </Container>
  );
}
