/* eslint-disable camelcase */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { add, format, isAfter, max } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import {
  Box,
  ButtonValidar,
  Container,
  TextButtonValidar,
  Title,
} from './styles';

export function Valide() {
  const { user } = useAuth();
  const { nome, id } = user;
  const { navigate } = useNavigation();
  const [data, setData] = useState(
    format(new Date(Date.now()), 'dd/MM/yyyy - HH:mm'),
  );
  const [load, setLoad] = useState(false);

  const hanldeValidar = useCallback(async () => {
    const dados = {
      nome,
      user_id: id,
    };

    await api
      .post('/presenca/create-order-presenca', dados)
      .then(h => {
        setLoad(false);
        navigate('INÍCIO');
        Alert.alert(
          'Solicitação enviada',
          'Aguarde um adm validar sua presença',
        );
      })
      .catch(h => {
        console.log('presenca', h.response.data);
        Alert.alert('Erro ao validar sua presença', h.response.data.message);
      });
  }, [id, navigate, nome]);

  return (
    <Container>
      <Header title="Valide sua presença" />

      <Box>
        <Title>{data} </Title>
      </Box>

      <ButtonValidar onPress={hanldeValidar}>
        {load ? (
          <ActivityIndicator />
        ) : (
          <TextButtonValidar>validar</TextButtonValidar>
        )}
      </ButtonValidar>
    </Container>
  );
}
