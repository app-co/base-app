import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { isPast, isWithinInterval, set } from 'date-fns';

import { IAppointment } from '@/dtos';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { useFocusEffect } from '@react-navigation/native';

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
  const { logOut, provider, updateUser } = useAuth();

  const data = React.useMemo(() => {
    const apoint = provider.appointment

      .filter(h => {
        const past = isPast(new Date(h.start));
        const start = set(new Date(), {
          hours: 0,
          minutes: provider.workhour.from,
        });
        const end = set(new Date(), {
          hours: 0,
          minutes: provider.workhour.at,
        });

        const interval = isWithinInterval(new Date(h.start), {
          start,
          end,
        });

        if (!past && interval) {
          return h;
        }
      })
      .sort((a, b) => {
        if (a.start < b.start) {
          return -1;
        }
      });

    const slice = apoint.filter((h, i) => {
      if (i > 0) {
        return h;
      }
    });

    return { apoint, slice };
  }, [provider]);

  useFocusEffect(
    useCallback(() => {
      updateUser();
    }, []),
  );
  return (
    <S.Container>
      <Menu variant="gray" />

      {data.apoint.length === 0 ? (
        <S.title>Não há horários para hoje</S.title>
      ) : (
        <>
          <S.title>Confira seus horários para hoje</S.title>

          <Card next item={data.apoint[0]} />
        </>
      )}

      <FlatList
        style={{ top: -35 }}
        contentContainerStyle={{
          paddingTop: 50,
        }}
        data={data.slice}
        keyExtractor={h => h.id}
        renderItem={({ item: h }) => <Card next={false} item={h} />}
      />
    </S.Container>
  );
}
