import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { Box, Center, HStack, Radio } from 'native-base';
import * as Ico from 'phosphor-react-native';

import { Menu } from '../../components/Menu';
import { Select } from '../../components/Select';
import { UserList } from '../../components/UserList';
import * as S from './styles';

type TSelectType = 'DIA' | 'MES' | 'ANO';
export function Agenda() {
  const [selectType, setSelectType] = React.useState<TSelectType>('DIA');
  const [day, setDay] = React.useState(new Date());

  const add = React.useCallback(async () => {
    switch (selectType) {
      case 'DIA':
        {
          const ad = addDays(day, 1);
          setDay(ad);
        }
        break;

      case 'MES':
        {
          const mo = addMonths(day, 1);
          setDay(mo);
        }
        break;

      case 'ANO':
        {
          const ano = addYears(day, 1);
          setDay(ano);
        }
        break;

      default:
        break;
    }
  }, [day, selectType]);

  const minus = React.useCallback(async () => {
    switch (selectType) {
      case 'DIA':
        {
          const ad = subDays(day, 1);
          setDay(ad);
        }
        break;

      case 'MES':
        {
          const mo = subMonths(day, 1);
          setDay(mo);
        }
        break;

      case 'ANO':
        {
          const ano = subYears(day, 1);
          setDay(ano);
        }
        break;

      default:
        break;
    }
  }, [day, selectType]);

  return (
    <>
      <Menu />
      <S.Container>
        <Center px={4}>
          <HStack w="full" justifyContent="space-evenly">
            <Select
              pres={() => setSelectType('DIA')}
              selected={selectType === 'DIA'}
              title="DIA"
            />
            <Select
              pres={() => setSelectType('MES')}
              selected={selectType === 'MES'}
              title="MÊS"
            />
            <Select
              pres={() => setSelectType('ANO')}
              selected={selectType === 'ANO'}
              title="ANO"
            />
          </HStack>
        </Center>

        <Center>
          <HStack space={8} alignItems="center" mt="4">
            <TouchableOpacity onPress={minus}>
              <Ico.CaretLeft size={34} weight="duotone" />
            </TouchableOpacity>

            {selectType === 'DIA' && (
              <Center w="20">
                <S.title>{getDate(day)}</S.title>
              </Center>
            )}

            {selectType === 'MES' && (
              <Center w="32">
                <S.title>{format(day, 'MMMM')}</S.title>
              </Center>
            )}

            {selectType === 'ANO' && (
              <Center w="20">
                <S.title>{getYear(day)}</S.title>
              </Center>
            )}

            <TouchableOpacity onPress={add}>
              <Ico.CaretRight size={34} weight="duotone" />
            </TouchableOpacity>
          </HStack>
        </Center>

        <Box mt="4" p="8">
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
        </Box>
      </S.Container>
    </>
  );
}
