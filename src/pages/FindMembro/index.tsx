import fire from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Linkin from 'expo-linking';
import { Center } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  View,
} from 'react-native';
import { useQuery } from 'react-query';

import { FindMembroComponent } from '../../components/FindMembro';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { useData } from '../../contexts/useData';
import { IProfileDto, IStars, IUserDtos } from '../../dtos';
import { api } from '../../services/api';
import { Box, Container, Flat, Title } from './styles';

export function FindUser() {
  const { users } = useData();

  const [search, setSearch] = React.useState('');
  const data = (users.data as IUserDtos[]) || [];

  const handlePress = useCallback(async (url: string) => {
    await Linkin.openURL(`https://${url}`);
  }, []);

  const handleNavigateToWatts = useCallback(async (url: string) => {
    await Linkin.openURL(`https://wa.me/55${url}`);
  }, []);

  const usersL =
    search.length > 0
      ? data.filter(h => {
          const up = h.nome.toLocaleUpperCase();
          return up.includes(search);
        })
      : data;

  const list = React.useMemo(() => {
    const us = [];
    usersL.forEach(user => {
      let i = 0;
      const total = user.Stars.length === 0 ? 1 : user.Stars.length;
      let star = 0;
      const st = [];

      user.Stars.forEach((h: IStars) => {
        star += h.star;
      });
      const md = star / total;
      const value = Number(md.toFixed(0)) === 0 ? 1 : Number(md.toFixed(0));

      while (i < value) {
        i += 1;
        st.push(i);
      }

      const data = {
        ...user,
        media: value,
      };

      us.push(data);
    });

    return us;
  }, [usersL]);

  if (users.isLoading) {
    return (
      <Center>
        <ActivityIndicator size={46} />
      </Center>
    );
  }

  return (
    <Container>
      <Header title="Localize os membros" />

      <Center>
        <Form>
          <Box>
            <Input
              name="find"
              icon="search"
              autoCapitalize="characters"
              onChangeText={setSearch}
            />
          </Box>
        </Form>
      </Center>

      <FlatList
        // contentContainerStyle={{ paddingBottom: 150 }}
        data={list}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => (
          <View>
            <FindMembroComponent
              star={h.media}
              avatar={h?.profile?.avatar}
              name={h.nome}
              workName={h.profile.workName}
              whats={() => {
                handleNavigateToWatts(h.profile.whats);
              }}
              face={() => {}}
              insta={() => {}}
              maps={() => {}}
            />
          </View>
        )}
      />
    </Container>
  );
}
