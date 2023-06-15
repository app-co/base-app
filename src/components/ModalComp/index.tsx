import { Feather } from '@expo/vector-icons';
import { Box, Center, HStack } from 'native-base';
import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '../../global/styles/theme';
import * as S from './styles';

interface Prps {
  title: string;
  children: ReactNode;
  closed: () => void;
}

export function ModalComp({ title, children, closed }: Prps) {
  return (
    <S.Container>
      <S.box>
        <HStack
          w="full"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="3"
          px="2"
        >
          <S.title>{title}</S.title>
          <TouchableOpacity onPress={closed} style={{ padding: 4 }}>
            <Feather
              size={30}
              name="x-circle"
              color={theme.colors.focus_second}
            />
          </TouchableOpacity>
        </HStack>
        <Box>{children}</Box>
      </S.box>
    </S.Container>
  );
}
