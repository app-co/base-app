import { Avatar, Box, HStack } from 'native-base';
import { ArrowLineUp, PencilLine, Trash } from 'phosphor-react-native';

import React from 'react';

import { cor } from '@/styles/cor';

import * as S from './styles';

interface I {
  edit: boolean;
  pres: () => void;
  del: () => void;
  agn: () => void;
  agr: () => void;
}

export function ClientsList({ edit = true, pres, del, agn, agr }: I) {
  return (
    <S.Container>
      <HStack justifyContent="space-between" w="full">
        <HStack alignItems="center">
          <Avatar />
          <S.title>ClientsList</S.title>
        </HStack>

        {edit ? (
          <S.touch onPress={pres}>
            <ArrowLineUp color={cor.light['glow-c']} size={34} />
          </S.touch>
        ) : (
          <S.touch onPress={pres}>
            <PencilLine color={cor.light['glow-c']} size={34} />
          </S.touch>
        )}
      </HStack>

      {edit && (
        <HStack mt="4" w="full" justifyContent="space-between">
          <S.touch onPress={del}>
            <S.del>DELETAR</S.del>
          </S.touch>

          <S.touch onPress={agn}>
            <S.agenda>AGENDA</S.agenda>
          </S.touch>

          <S.touch onPress={agr}>
            <S.agendar>AGENDAR</S.agendar>
          </S.touch>
        </HStack>
      )}
    </S.Container>
  );
}
