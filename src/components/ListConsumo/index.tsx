/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { View } from 'react-native';

import { BoxData, BoxValor, Container, TextData, TextValue } from './styles';

interface Props {
  data: string;
  valor: string;
  descricao: string;
}

export function ListConsumo({ data, valor, descricao }: Props) {
  return (
    <Container>
      <BoxData>
        <TextData>{data}</TextData>
      </BoxData>

      <BoxValor>
        <TextValue style={{ alignSelf: 'center' }}> {valor} </TextValue>
        <View
          style={{
            flex: 1,
            padding: 2,
            alignItems: 'center',
          }}
        >
          <TextValue> {descricao} </TextValue>
        </View>
      </BoxValor>
    </Container>
  );
}
