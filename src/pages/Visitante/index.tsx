/* eslint-disable camelcase */
import { Form } from '@unform/mobile';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQueries, useQuery } from 'react-query';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { IGuest } from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styles';

export function Visitante() {
  const { user } = useAuth();

  const [selected, setSelected] = React.useState('approveded');
  const [showModal, setShowModa] = React.useState(false);
  const [name_convidado, setNameConvidado] = React.useState('');

  const { data, isLoading, refetch } = useQuery('convidados', async () => {
    const res = await api.get('/guest');

    return res.data as IGuest[];
  });

  const list = React.useMemo(() => {
    let approved: IGuest[] = [];
    let pendent: IGuest[] = [];

    if (!isLoading) {
      approved = data.filter(
        h => h.fk_user_id === user?.id && h.approved === true,
      );

      pendent = data.filter(
        h => h.fk_user_id === user?.id && h.approved === false,
      );
    }

    return { approved, pendent };
  }, [data, user, isLoading]);

  const handleSave = React.useCallback(async () => {
    try {
      await api
        .post('/guest/create-guest', {
          name_convidado,
        })
        .then(h => {
          setShowModa(false);
          refetch();
        });
    } catch (err) {
      console.log(err.response);
    }
  }, [name_convidado]);

  if (isLoading) {
    return (
      <Center flex="1">
        <ActivityIndicator size={40} />
      </Center>
    );
  }

  return (
    <S.Container>
      <Header />
      <Modal visible={showModal}>
        <Center flex="1">
          <Form>
            <Input
              onChangeText={setNameConvidado}
              placeholder="Nome do convidado"
              name="name"
              value={name_convidado}
            />

            <Button pres={handleSave} title="SALVAR" />
          </Form>
        </Center>
      </Modal>

      <Box flex="1">
        <HStack mt={8} w="full" justifyContent="space-evenly">
          <Center>
            <S.buttonType
              onPress={() => setSelected('approveded')}
              selected={selected === 'approveded'}
            >
              <S.textButon>Confirmados</S.textButon>
            </S.buttonType>
          </Center>

          <Center>
            <S.buttonType
              onPress={() => setSelected('pendent')}
              selected={selected === 'pendent'}
            >
              <S.textButon>Pendente</S.textButon>
            </S.buttonType>
          </Center>
        </HStack>

        {selected === 'approveded' && (
          <FlatList
            data={list.approved}
            renderItem={({ item: h }) => (
              <Box
                bg={
                  selected === 'approveded' ? theme.colors.entrada : 'gray.300'
                }
                mt={2}
                p={5}
              >
                <S.title
                  style={{
                    fontFamily: theme.fonts.bold,
                    fontSize: RFValue(16),
                  }}
                >
                  Nome do convidado
                </S.title>
                <S.text>{h.name_convidado}</S.text>

                <S.title
                  style={{
                    fontFamily: theme.fonts.bold,
                    fontSize: RFValue(16),
                    marginTop: 8,
                  }}
                >
                  Data de aprovação
                </S.title>
                <S.text>
                  {format(new Date(h.updated_at), 'dd/MM/yy - HH:mm')}
                </S.text>
              </Box>
            )}
          />
        )}

        {selected === 'pendent' && (
          <FlatList
            mt="3"
            data={list.pendent}
            renderItem={({ item: h }) => (
              <Box bg="gray.300" mt={2} p={3}>
                <S.title
                  style={{
                    fontFamily: theme.fonts.blac,
                    fontSize: RFValue(16),
                  }}
                >
                  Nome do convidado
                </S.title>
                <S.text>{h.name_convidado}</S.text>
                <S.title
                  style={{
                    fontFamily: theme.fonts.blac,
                    fontSize: RFValue(16),
                    marginTop: 8,
                  }}
                >
                  Dia que foi convidado
                </S.title>
                <S.text>{format(new Date(h.created_at), 'dd/MM/yy')} </S.text>
              </Box>
            )}
          />
        )}

        {list.approved.length === 0 && selected === 'approveded' && (
          <Center flex="1">
            <S.title>Você ainda não tem convidados</S.title>
          </Center>
        )}

        {list.pendent.length === 0 && selected === 'pendent' && (
          <Center flex="1">
            <S.title>Você ainda não tem convidados</S.title>
          </Center>
        )}
      </Box>

      <Box pb={5}>
        <Center>
          <Button pres={() => setShowModa(true)} title="ADICIONAR CONVIDADO" />
        </Center>
      </Box>
    </S.Container>
  );
}
