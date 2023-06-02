/* eslint-disable react/require-default-props */
import React from 'react';

import { Avatar, ButtonToggle, BxName, Container, Line, Title } from './styles';

interface Props {
  closeModal: () => void;
  nome: string;
  avatar: string;
}
export function MembroLista({ closeModal, nome, avatar }: Props) {
  return (
    <Container>
      <BxName onPress={closeModal}>
        <Avatar source={{ uri: avatar }} />
        <Title>{nome}</Title>
      </BxName>
      <Line />
    </Container>
  );
}
