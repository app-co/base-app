/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { api } from '../../services/api';
import {
  BoxContainer,
  BoxEventos,
  BoxPosition,
  Container,
  Title,
} from './styles';

interface Props {
  compras: Tips;
  vendas: Tips;
  presenca: Tips;
  indication: Tips;
  b2b: Tips;
}

interface Tips {
  id: string;
  nome: string;
  pontos: number;
  rank: number;
}

interface IProps {
  item: any;
}

export function Classificacao({ item }: IProps) {
  const [ponts, setPonts] = React.useState<Props>();

  const [load, setLoad] = useState(true);

  const dados = React.useCallback(async () => {
    // !! TRANSACTION
    await api
      .get('user/global-rank-ind')
      .then(h => {
        const rs = h.data as Props;

        setPonts(rs);
      })
      .catch(h => {
        const { message } = h.response.data;
        if (message === 'falta o token' || message === 'token expirou') {
          Alert.alert('Erro', 'Seu tokem expirou');
        }
      });
  }, []);

  React.useEffect(() => {
    if (ponts) {
      setLoad(false);
    }
  }, [ponts]);

  useFocusEffect(
    useCallback(() => {
      dados();
    }, [dados]),
  );

  if (!ponts) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      {load ? (
        <ActivityIndicator size="large" />
      ) : (
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
              <Title>{item} pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
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
              <Title>{item} pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
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
              <Title>Indicações</Title>
              <Title>{item} pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
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
              <Title>Presença</Title>
              <Title>{item} pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
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
              <Title>Padrinho</Title>
              <Title>{item}pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
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
              <Title>{item}pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item}</Title>
            </BoxPosition>
          </View>
        </BoxEventos>
      )}
    </Container>
  );
}
