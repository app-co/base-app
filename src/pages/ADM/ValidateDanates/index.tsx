/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { Box, Center, FlatList, HStack } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { Header } from '../../../components/Header';
import { useDonate } from '../../../contexts/donate';
import { useData } from '../../../contexts/useData';
import { IDonate, IUserDtos } from '../../../dtos';
import theme from '../../../global/styles/theme';
import * as S from './styles';

export function ValidateDanates() {
  const { donateListAll, donateUpdate, donateDelete } = useDonate();
  const { users } = useData();

  const donates = (donateListAll.data as IDonate[]) || [];
  const usersL = (users.data as IUserDtos[]) || [];

  const list = React.useMemo(() => {
    const li: IDonate[] = [];

    donates.forEach(dn => {
      const us = usersL.find(h => h.id === dn.fk_id_user);

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
  }, [donates, usersL]);

  const handleAproved = React.useCallback(
    async (id: string) => {
      donateUpdate(id).then(() => donateListAll.refetch());
    },
    [donateListAll, donateUpdate],
  );

  const handleReprove = React.useCallback(
    async (id: string) => {
      try {
        donateDelete(id).then(() => {});
      } catch (err) {
        console.log(err.response);
      }
    },
    [donateDelete],
  );

  useFocusEffect(
    useCallback(() => {
      donateListAll.refetch();
    }, [donateListAll]),
  );

  if (donateListAll.isLoading) {
    <Center bg="gray.700" flex="1">
      <ActivityIndicator size={40} color={theme.colors.focus_second} />
    </Center>;
  }

  return (
    <S.Container>
      <Header />

      {list.length === 0 && (
        <Center>
          <S.title style={{ color: theme.colors.focus_second }}>
            Ainda não há donativos
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
              <S.title>ITENS</S.title>
              <S.text>{h.itens}</S.text>
            </Box>

            <Center>
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
