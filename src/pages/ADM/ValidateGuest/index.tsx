/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { Header } from '../../../components/Header';
import { useDonate } from '../../../contexts/donate';
import { useInvit } from '../../../contexts/invit';
import { useData } from '../../../contexts/useData';
import { IDonate, IGuest, IUserDtos } from '../../../dtos';
import theme from '../../../global/styles/theme';
import * as S from './styles';

export function ValidateGuest() {
  const { users } = useData();
  const { invitListAll, invitUpdate, invitDelete } = useInvit();

  const list = React.useMemo(() => {
    const guestL = (invitListAll.data as IGuest[]) || [];
    const usersL = (users.data as IUserDtos[]) || [];
    const li: IGuest[] = [];

    guestL.forEach(dn => {
      const us = usersL.find(h => h.id === dn.fk_user_id);

      if (us && dn.approved === false) {
        const dt = {
          ...dn,
          date: format(new Date(dn.created_at!), 'dd/MM/yy'),
          nome: us.nome,
        };
        li.push(dt);
      }
    });

    return li;
  }, [invitListAll.data, users.data]);

  const handleAproved = React.useCallback(
    async (id: string) => {
      invitUpdate(id);
    },
    [invitUpdate],
  );

  const handleReprove = React.useCallback(
    async (id: string) => {
      console.log('erro');
      invitDelete(id);
    },
    [invitDelete],
  );

  useFocusEffect(
    useCallback(() => {
      invitListAll.refetch();
    }, [invitListAll]),
  );

  if (invitListAll.isLoading) {
    <Center bg="gray.700" flex="1">
      <ActivityIndicator size={40} color={theme.colors.focus_second} />
    </Center>;
  }

  return (
    <S.Container>
      <Header />

      {list.length === 0 && (
        <Center flex="1">
          <S.title style={{ color: theme.colors.focus_second }}>
            Lista de convidados vazia
          </S.title>
        </Center>
      )}

      <FlatList
        data={list}
        keyExtractor={h => String(h.id)}
        renderItem={({ item: h }) => (
          <Box
            px="4"
            mt="1"
            bg={theme.colors.focus_light}
            borderRadius="8"
            py="4"
          >
            <HStack mb="2" justifyContent="space-between" alignItems="center">
              <S.title>{h.nome}</S.title>
              <S.title>{h.data}</S.title>
            </HStack>

            <Box m="4">
              <S.text>Convidado</S.text>
              <S.title>{h.name_convidado}</S.title>
            </Box>

            <Center mt="4">
              <HStack space={20}>
                <S.reprovedButon onPress={() => handleReprove(h.id!)}>
                  <S.title>RECUSAR</S.title>
                </S.reprovedButon>

                <S.approvedButon onPress={() => handleAproved(h.id!)}>
                  <S.title>APROVAR</S.title>
                </S.approvedButon>
              </HStack>
            </Center>
          </Box>
        )}
      />
    </S.Container>
  );
}
