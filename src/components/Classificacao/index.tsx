/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { ISelfPonts } from '../../dtos';
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
  item: ISelfPonts;
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
              <Title>{item?.indication?.rank}</Title>
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
              <Title>Convidados</Title>
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
              <Title>Donativos</Title>
              <Title>{item?.b2b?.pontos}pts</Title>
            </BoxContainer>

            <BoxPosition>
              <Title>{item?.b2b?.rank}</Title>
            </BoxPosition>
          </View>
        </BoxEventos>
      )}
    </Container>
  );
}
