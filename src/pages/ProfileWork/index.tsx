import React, { useCallback, useRef } from 'react';
import { FlatList, LayoutAnimation, Pressable } from 'react-native';

import { format, set } from 'date-fns';
import { Box, Center, HStack, ScrollView, VStack } from 'native-base';
import { Trash } from 'phosphor-react-native';

import { Menu } from '@/components/Menu';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { cor } from '@/styles/cor';
import { _hight } from '@/styles/sizes';
import { FlashList } from '@shopify/flash-list';

import * as S from './styles';

const week: any = {
  1: 'Segunda',
  2: 'Terça',
  3: 'Quarta',
  4: 'Quinta',
  5: 'Sexta',
  6: 'Sábado',
  0: 'Domingo',
};

interface IVocation {
  id: string;
  date: string;
  type: string;
  start: string;
  end: string;
}

export function ProfileWork() {
  const ref = useRef<FlashList<IVocation>>(null);

  const { provider, updateUser } = useAuth();

  const jorn = React.useMemo(() => {
    const start = format(
      set(new Date(), { hours: 0, minutes: provider.workhour.from }),
      'HH:mm',
    );

    const end = format(
      set(new Date(), { hours: 0, minutes: provider.workhour.at }),
      'HH:mm',
    );

    const weekDate = provider.workhour.week.sort((a, b) => {
      if (a < b) {
        return -1;
      }
    });

    const vocation = provider.Vocation.map(h => {
      let data: any = {};
      const date = format(new Date(h.start), 'dd/MM/yy');
      const month = format(new Date(h.start), 'MM/yy');
      const start = format(new Date(h.start), 'HH:mm');
      const end = format(new Date(h.end), 'HH:mm');

      if (h.type === 'DIARIA') {
        data = {
          id: h.id,
          type: h.type,
          date,
          start,
          end,
        };
      }

      if (h.type === 'MENSAL') {
        data = {
          id: h.id,
          type: h.type,
          date: month,
          start,
          end,
        };
      }

      if (h.type === 'SEMANAL') {
        const wek = week[h.weekend[0]];

        data = {
          id: h.id,
          type: h.type,
          date: wek,
          start,
          end,
        };
      }
      return data;
    });

    return { start, vocation, end, weekDate };
  }, [provider]);

  const [vocation, setVocation] = React.useState<IVocation[]>(jorn.vocation);

  const handleDeleteVocation = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/vocation-delete/${id}`);

        setVocation(vocation.filter(h => h.id !== id));

        ref.current?.prepareForLayoutAnimationRender();
        // After removing the item, we can startWorkHour the animation.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setTimeout(() => {
          updateUser();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
    [updateUser, vocation],
  );

  const renderItem = ({ item }: { item: IVocation }) => {
    return (
      <Box
        mt="4"
        justifyContent="center"
        bg={cor.light.gray}
        p="2"
        borderRadius={4}
      >
        <S.subTitle style={{ cor: cor.light['glow-c'] }}>
          {item.type}
        </S.subTitle>
        <HStack alignItems="center" justifyContent="space-between">
          <S.text>{item.date}</S.text>

          <HStack alignItems="center">
            <S.text>
              {item.start} - {item.end}
            </S.text>

            <S.touch onPress={() => handleDeleteVocation(item.id)}>
              <Trash color="#ff4545" size={30} weight="duotone" />
            </S.touch>
          </HStack>
        </HStack>
      </Box>
    );
  };

  return (
    <S.Container>
      <Menu />

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <S.content>
          <VStack>
            <Box>
              <S.title>Jornada de trabalho</S.title>
              <S.subTitle>Início do expediente: {jorn.start} hs</S.subTitle>
              <S.subTitle>Fim do expediente: {jorn.end} hs</S.subTitle>
            </Box>

            <Box mt="4">
              <S.title>Dias da semana</S.title>
              <S.boxSem>
                {provider.workhour.week.map(h => (
                  <S.subTitle key={h}>{week[h]}</S.subTitle>
                ))}
              </S.boxSem>
            </Box>
          </VStack>
        </S.content>

        <S.content style={{ height: _hight * 0.4 }}>
          <S.title>Suas folgas</S.title>

          {jorn.vocation.length === 0 ? (
            <Center flex="1">
              <S.subTitle>Você ainda não possui folgas configuradas</S.subTitle>
            </Center>
          ) : (
            <FlashList
              ref={ref}
              data={vocation}
              keyExtractor={h => h.id}
              renderItem={renderItem}
            />
          )}
        </S.content>

        <S.content>
          <S.title>Seus serviços</S.title>

          <VStack>
            {provider.Service.map(h => (
              <HStack
                key={h.id}
                alignItems="center"
                justifyContent="space-between"
              >
                <S.text>{h.name}</S.text>

                <HStack alignItems="center">
                  <S.text>
                    {format(
                      set(new Date(), { hours: 0, minutes: h.duration }),
                      'HH:mm',
                    )}
                  </S.text>

                  <S.touch>
                    <Trash color="#ff4545" size={30} weight="duotone" />
                  </S.touch>
                </HStack>
              </HStack>
            ))}
          </VStack>
        </S.content>
      </ScrollView>
    </S.Container>
  );
}
