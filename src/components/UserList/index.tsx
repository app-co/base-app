import React from 'react';
import { FlatList } from 'react-native';

import { format } from 'date-fns';
import { Box, Center, Circle, HStack, VStack } from 'native-base';

import { IAppointment } from '@/dtos';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';

import * as S from './styles';

interface I {
  item: IAppointment[];
  day: number;
}

export function UserList({ item, day = 1 }: I) {
  return (
    <S.Container>
      <VStack>
        <Circle
          alignItems="center"
          justifyContent="center"
          bg={cor.light.black}
          size="sm"
          p="2"
        >
          <S.subTitle style={{ fontFamily: font.bold }}>{day}</S.subTitle>
        </Circle>

        <FlatList
          data={item}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => (
            <Box>
              <HStack alignItems="center" justifyContent="space-between">
                <Box p="2">
                  <S.subTitle>{h.client_name}</S.subTitle>
                  <S.text>{h.service}</S.text>
                </Box>

                <S.subTitle>{h.formated}</S.subTitle>
              </HStack>
              <S.line />
            </Box>
          )}
        />
      </VStack>

      <S.line />
    </S.Container>
  );
}
