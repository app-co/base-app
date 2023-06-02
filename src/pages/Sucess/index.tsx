/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Modal } from 'react-native';

import logo from '../../assets/logo.png';
import { StarModal } from '../../components/StarModal';
import { IUserDtos } from '../../dtos';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { Button, Container, Image, Message, Title } from './styles';

interface RouteParams {
  prestador: IUserDtos;
  description: string;
}

export function Sucess() {
  const route = useRoute();
  const { user } = useAuth();
  const [star, setStar] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const { prestador, description } = route.params as RouteParams;

  const { reset } = useNavigation();

  const sendPushNotification = useCallback(async () => {
    const message = {
      to: prestador.token,
      sound: 'default',
      title: 'Alguem esta consumindo seu produto',
      body: `cliente ${user.nome} está adiquirindo: ${description}`,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }, []);

  const navigateToHome = useCallback(async () => {
    await api
      .post('/star/assest', {
        star,
        fk_id_user: prestador.id,
      })
      .then(() => {
        sendPushNotification();
        setModal(false);
        reset({
          routes: [{ name: 'INÍCIO' }],
        });
      });
  }, [reset, star]);

  return (
    <Container>
      <Modal visible={modal} animationType="fade" transparent>
        <StarModal
          setStars={h => setStar(h)}
          star={star}
          submit={navigateToHome}
        />
      </Modal>
      <Message style={{ textAlign: 'center', fontSize: 28 }}>
        OPERAÇAO REALIZADA!!
      </Message>

      <Message style={{ textAlign: 'center' }}>
        Aguarde a confimação da {prestador?.profile?.workName}
      </Message>

      <Button onPress={() => setModal(true)}>
        <Title>Ok</Title>
      </Button>
      <Image source={logo} />
    </Container>
  );
}
