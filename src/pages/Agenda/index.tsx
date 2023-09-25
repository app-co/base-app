import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import {
  addMonths,
  addYears,
  format,
  getDate,
  getMonth,
  getYear,
  isPast,
  isWithinInterval,
  set,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { Box, Center, HStack, Radio } from 'native-base';
import * as Ico from 'phosphor-react-native';

import { IAppointment } from '@/dtos';
import { useAuth } from '@/hooks/useAuth';
import { cor } from '@/styles/cor';

import { Menu } from '../../components/Menu';
import { Select } from '../../components/Select';
import { UserList } from '../../components/UserList';
import * as S from './styles';
import { Container } from './styles';

type TSelectType = 'DIA' | 'MES' | 'ANO';

const months: any = {
  0: 'Jan',
  1: 'Fev',
  2: 'Mar',
  3: 'Abr',
  4: 'Mai',
  5: 'Jun',
  6: 'Jul',
  7: 'Ago',
  8: 'Set',
  9: 'Out',
  10: 'Nov',
  11: 'Dez',
};

const byDay = Array.from({ length: 31 }, (_, index) => index + 1);

interface Appointment {
  day: number;
  item: IAppointment[];
}

export function Agenda() {
  const { provider } = useAuth();
  const [day, setDay] = React.useState(new Date());

  const data = React.useMemo(() => {
    const apoint = provider.appointment
      .sort((a, b) => {
        if (a.start < b.start) {
          return -1;
        }
      })
      .filter(h => {
        const dateApoint = format(new Date(h.start), 'MM-yy');
        const currencyDate = format(day, 'MM-yy');

        if (dateApoint === currencyDate) {
          return h;
        }
      })
      .map(h => {
        const formated = format(new Date(h.start), 'HH:mm');

        return {
          ...h,
          formated,
        };
      });

    const appointments: Appointment[] = [];

    byDay.forEach(day => {
      const item: IAppointment[] = [];
      apoint.forEach(h => {
        const dayApoint = Number(format(new Date(h.start), 'dd'));

        if (day === dayApoint) {
          item.push(h);
        }
      });

      const dt = {
        day,
        item,
      };

      appointments.push(dt);
    });

    return { apoint, appointments };
  }, [day, provider.appointment]);

  const add = React.useCallback(async () => {
    const ad = addMonths(day, 1);
    setDay(ad);
  }, [day]);

  const minus = React.useCallback(async () => {
    const ad = subMonths(day, 1);
    setDay(ad);
  }, [day]);

  const month = months[getMonth(day)];

  return (
    <>
      <Menu />
      <Container>
        <Center>
          <HStack space={8} alignItems="center" mt="4">
            <TouchableOpacity onPress={minus}>
              <Ico.CaretLeft
                color={cor.light['glow-a']}
                size={34}
                weight="duotone"
              />
            </TouchableOpacity>

            <Center w="32">
              <S.title>{month}</S.title>
            </Center>

            <TouchableOpacity onPress={add}>
              <Ico.CaretRight
                color={cor.light['glow-a']}
                size={34}
                weight="duotone"
              />
            </TouchableOpacity>
          </HStack>
        </Center>

        <Box mt="4" p="8">
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data.appointments}
            keyExtractor={h => String(h.day)}
            renderItem={({ item: h }) => <UserList day={h.day} item={h.item} />}
          />
        </Box>
      </Container>
    </>
  );
}
