/* eslint-disable react/jsx-props-no-spreading */
import {
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { HStack, VStack } from 'native-base';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Container, Header, LogOf, Title, TitleName } from './styles';

type Props = DrawerContentComponentProps;

export function DrawerContent({ ...props }: Props) {
  const { logOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HStack maxW={200}>
          <Avatar source={{ uri: user.profile.avatarUrl }} />
          <VStack ml={5}>
            <Text style={{ color: theme.colors.text, fontSize: RFValue(18) }}>
              Olá
            </Text>
            <TitleName>{user.nome} </TitleName>
          </VStack>
        </HStack>
      </Header>

      <ScrollView>
        <DrawerItemList {...props} />

        <LogOf
          onPress={() => {
            logOut();
          }}
        >
          <Title style={{ color: theme.colors.text_secundary }}>SAIR</Title>
        </LogOf>
      </ScrollView>
    </Container>
  );
}
