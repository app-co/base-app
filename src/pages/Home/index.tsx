import React from 'react';
import { FlatList, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import { Card } from '../../components/Card';
import { Menu } from '../../components/Menu';
import * as S from './styles';

const cards = [
  { id: '1', nex: true },
  { id: '2', nex: false },
  { id: '3', nex: false },
  { id: '4', nex: false },
  { id: '5', nex: false },
  { id: '6', nex: false },
  { id: '7', nex: false },
  { id: '8', nex: false },
];

export function Home() {
  const { logOut } = useAuth();

  React.useEffect(() => {
    // logOut();
  }, []);
  return (
    <>
      <Menu title="Home" variant="rose" />
      <S.Container>
        <S.title>Confira seus horários para hoje</S.title>

        <Card next />

        <FlatList
          style={{ top: -35 }}
          contentContainerStyle={{
            paddingTop: 50,
          }}
          data={cards}
          keyExtractor={h => h.id}
          renderItem={({ item: h }) => <Card />}
        />
      </S.Container>
    </>
  );
}
