import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  pres: () => void;
}
export function Button({ title, pres }: Props) {
  return (
    <Container onPress={pres}>
      <Title>{title}</Title>
    </Container>
  );
}
