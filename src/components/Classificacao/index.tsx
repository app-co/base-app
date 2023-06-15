/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { View } from 'react-native';

import { ISelfPonts } from '../../dtos';
import {
  BoxContainer,
  BoxEventos,
  BoxPosition,
  Container,
  Title,
} from './styles';

interface IProps {
  item: ISelfPonts;
}

export function Classificacao({ item }: IProps) {
  return (
    <Container>
      <BoxEventos>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>COMPRAS</Title>
            <Title>{item?.compras?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.compras?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>VENDAS</Title>
            <Title>{item?.vendas?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.vendas?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>INDICAÇÕES</Title>
            <Title>{item?.indication?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.indication?.ranck}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>PRESENÇA</Title>
            <Title>{item?.presenca?.pontos} pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.presenca?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>PADRINHO</Title>
            <Title>{item?.padrinho?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.padrinho?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>B2B</Title>
            <Title>{item?.b2b?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.b2b?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>CONVIDADOS</Title>
            <Title>{item?.convidado?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.convidado?.rank}</Title>
          </BoxPosition>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <BoxContainer>
            <Title>DONATIVOS</Title>
            <Title>{item?.donates?.pontos}pts</Title>
          </BoxContainer>

          <BoxPosition>
            <Title>{item?.donates?.rank}</Title>
          </BoxPosition>
        </View>
      </BoxEventos>
    </Container>
  );
}
