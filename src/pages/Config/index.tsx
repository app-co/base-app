import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LayoutAnimation, Pressable } from 'react-native';

import { getYear } from 'date-fns';
import { Box, HStack, ScrollView, Toast, useToast, VStack } from 'native-base';

import { FlashList } from '@shopify/flash-list';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { _hora, _money, _stringToNumber } from '@/utils/mask/hora';
import { _hourToMinutis } from '@/utils/unidades';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { InputForm } from '@/components/InputForm';

import { ButtonConf } from '../../components/ButtonConf';
import { Menu } from '../../components/Menu';
import { Select } from '../../components/Select';
import * as S from './styles';

import { yupResolver } from '@hookform/resolvers/yup';

import * as y from 'yup';

type TVocation = 'DIARIA' | 'SEMANAL' | 'MENSAL' | '';

interface IWeek {
  week: string;
  id: number;
}

const semana = [
  { week: 'Seg', id: 1 },
  { week: 'Sex', id: 5 },
  { week: 'Ter', id: 2 },
  { week: 'Sab', id: 6 },
  { week: 'Qua', id: 3 },
  { week: 'Dom', id: 0 },
  { week: 'Qui', id: 4 },
];

const myFolga = [
  {
    id: '1',
    type: 'diaria',
    semana: [{ sem: 'Seg', id: '1' }],
    dia: 2,
    mes: 5,
    ano: 2027,
    from: 10,
    at: 12,
  },

  {
    id: '4',
    type: 'diaria',
    semana: [{ sem: 'Seg', id: '1' }],
    dia: 2,
    mes: 5,
    ano: 2026,
    from: 10,
    at: 12,
  },

  {
    id: '2',
    type: 'diaria',
    semana: [{ sem: 'Seg', id: '1' }],
    dia: 2,
    mes: 5,
    ano: 2025,
    from: 10,
    at: 12,
  },

  {
    id: '3',
    type: 'diaria',
    semana: [{ sem: 'Seg', id: '1' }],
    dia: 2,
    mes: 5,
    ano: 2024,
    from: 10,
    at: 12,
  },
];

interface IArrayFolga {
  id: string;
  type: string;
  semana: { sem: string; id: string }[];
  dia: number;
  mes: number;
  ano: number;
  from: number;
  at: number;
}

type TForm = {
  das: string;
  as: string;
};

const scheme = y.object({
  das: y.string().required('Digite a hora inicial'),
  as: y.string().required('Digite a hora final'),
});

export function Config() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: yupResolver(scheme),
  });
  const { provider } = useAuth();
  const toast = useToast();
  const [folga, setFolga] = React.useState<TVocation>('DIARIA');

  const [loadWorkHour, setLoadWorkHour] = React.useState(false);
  const [loadService, setLoadService] = React.useState(false);
  const [loadVocation, setLoadVocation] = React.useState(false);

  // work hours
  const [weekWorkHour, setWeekWorkHour] = React.useState<IWeek[]>([]);
  const [startWorkHour, setStartWorkHour] = React.useState('');
  const [endWorkHour, setEndWorkHour] = React.useState('');

  // vocation
  const [weekVocation, setWeekvocation] = React.useState(7);
  const [startVocation, setStartVocation] = React.useState('');
  const [endVocation, setEndVocation] = React.useState('');
  const [dayVocation, setDayVocation] = React.useState('');
  const [monthVocation, setMonthVocation] = React.useState('');

  // SERVICES
  const [nameService, setNameService] = React.useState('');
  const [timeService, setTimeService] = React.useState('');
  const [amountService, setAmoutService] = React.useState('');

  const [listFolga, setListFolga] = React.useState<IArrayFolga[]>(myFolga);

  const list = useRef<FlashList<IArrayFolga> | null>(null);

  const removeItem = React.useCallback(
    async (id: string) => {
      setListFolga(
        listFolga.filter(dataItem => {
          return dataItem.id !== id;
        }),
      );
      // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
      list.current?.prepareForLayoutAnimationRender();
      // After removing the item, we can startWorkHour the animation.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    },
    [listFolga],
  );

  const renderItem = ({ item }: { item: IArrayFolga }) => {
    return (
      <Pressable
        onPress={() => {
          removeItem(item.id);
        }}
      >
        <Box>
          <S.title>Cell Id: {item.from}</S.title>
        </Box>
      </Pressable>
    );
  };

  React.useEffect(() => {
    const maskHour = _hora(startWorkHour);
    const endwork = _hora(endWorkHour);

    setStartVocation(_hora(startVocation));
    setEndVocation(_hora(endVocation));

    const currency = _money(amountService);
    const timeServ = _hora(timeService);

    setAmoutService(currency);

    setStartWorkHour(maskHour);
    setEndWorkHour(endwork);

    setTimeService(timeServ);
  }, [
    amountService,
    endVocation,
    endWorkHour,
    startVocation,
    startWorkHour,
    timeService,
  ]);

  const handleSelect = React.useCallback(
    async (sem: IWeek) => {
      const findindex = weekWorkHour.findIndex(i => i.week === sem.week);
      const arrSelect: IWeek[] = [...weekWorkHour];

      if (findindex >= 0) {
        arrSelect.splice(findindex, 1);
      } else {
        arrSelect.push(sem);
      }

      setWeekWorkHour(arrSelect);
    },
    [weekWorkHour],
  );

  const handleUpdateWorkHour = React.useCallback(
    async (data: TForm) => {
      console.log(data);
      const from = _hourToMinutis(data.f);
      const at = _hourToMinutis(endWorkHour);
      const week = weekWorkHour.map(h => h.id);
      setLoadWorkHour(true);

      if (startWorkHour === '' || endWorkHour === '' || week.length === 0) {
        toast.show({
          title: 'Algo deu errado',
          description: 'Preencha todos os compos',
          placement: 'bottom',
          bgColor: 'red.500',
        });
        setLoadWorkHour(false);

        return null;
      }

      toast.show({
        title: 'Legal',
        description: 'Sua jornada de trabalho foi alterada com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
      try {
        await api.post('/workhour', {
          from,
          at,
          week,
          fk_provider_id: provider.id,
        });
      } catch (error: any) {
        setLoadVocation(false);
        const isError = error instanceof AppError;

        if (isError && error?.message) {
          toast.show({
            title: 'Algo deu errado',
            description: error.message,
            placement: 'bottom',
            bgColor: 'red.500',
          });
        } else {
          toast.show({
            title: 'Algo deu errado',
            description: 'Servidor em manutenção, tente novamente mais tarde',
            placement: 'bottom',
            bgColor: 'red.500',
          });
        }
      } finally {
        setLoadVocation(false);
      }
    },
    [endWorkHour, provider.id, startWorkHour, toast, weekWorkHour],
  );

  const handleUpdateVocation = React.useCallback(async () => {
    if (startVocation.length < 4 || endVocation.length < 4) {
      toast.show({
        title: 'Algo deu errado',
        description: 'Os horários devem ter o seguinte formato: "00:00"',
        placement: 'bottom',
        bgColor: 'red.500',
      });

      return null;
    }

    setLoadVocation(true);
    const start = `${dayVocation}:${monthVocation}:${getYear(
      new Date(),
    )}:${startVocation}`;
    const end = `${dayVocation}:${monthVocation}:${getYear(
      new Date(),
    )}:${endVocation}`;

    const week = weekWorkHour.map(h => h.id);

    try {
      await api.post('/vocation-create', {
        start,
        end,
        weekend: week,
        prestadorId: provider.id,
      });

      toast.show({
        title: 'Legal!',
        description: 'Sua folga foi salva',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error: any) {
      setLoadVocation(false);
      const isError = error instanceof AppError;

      if (isError && error?.message) {
        toast.show({
          title: 'Algo deu errado',
          description: error.message,
          placement: 'bottom',
          bgColor: 'red.500',
        });
      } else {
        toast.show({
          title: 'Algo deu errado',
          description: 'Servidor em manutenção, tente novamente mais tarde',
          placement: 'bottom',
          bgColor: 'red.500',
        });
      }
    } finally {
      setLoadVocation(false);
    }
  }, [
    dayVocation,
    endVocation,
    monthVocation,
    provider.id,
    startVocation,
    toast,
    weekWorkHour,
  ]);

  const handleCreateService = React.useCallback(async () => {
    setLoadService(true);
    const amount = _stringToNumber(amountService);
    const duration = _hourToMinutis(timeService);

    if (amountService === '' || timeService === '' || nameService === '') {
      toast.show({
        title: 'Algo deu errado',
        description: 'Preencha todos os compos',
        placement: 'bottom',
        bgColor: 'red.500',
      });
      return null;
    }

    try {
      await api.post('/service', {
        name: nameService,
        amount,
        duration,
        fk_provider_id: provider.id,
        description: 'alongamento facial',
      });

      toast.show({
        title: 'Legal!',
        description: 'Serviço salvo com sucesso.',
        placement: 'bottom',
        bgColor: 'green.500',
      });

      setNameService('');
      setTimeService('');
      setAmoutService('');
    } catch (error: any) {
      const isError = error instanceof AppError;
      setLoadService(false);

      if (isError && error?.message) {
        toast.show({
          title: 'Algo deu errado',
          description: error.message,
          placement: 'bottom',
          bgColor: 'red.500',
        });
      } else {
        toast.show({
          title: 'Algo deu errado',
          description: 'Servidor em manutenção, tente novamente mais tarde',
          placement: 'bottom',
          bgColor: 'red.500',
        });
      }
    } finally {
      setLoadService(false);
    }
  }, [amountService, nameService, provider.id, timeService, toast]);

  return (
    <>
      <Menu variant="gray" />
      <S.Container>
        <ScrollView>
          <S.box>
            <S.title>Jornada de trabalho</S.title>

            <HStack mt="8" w="full" justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <S.title>das</S.title>
                <InputForm
                  icon="clock"
                  name="das"
                  error={errors.das}
                  control={control}
                  render={({ onChange, value }) => (
                    <S.input
                      placeholder="00:00"
                      type="text"
                      value={_hora(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
                {/* <S.input
                  onChangeText={setStartWorkHour}
                  value={startWorkHour}
                  keyboardType="numeric"
                  placeholder="00:00"
                  maxLength={5}
                /> */}
              </HStack>

              <HStack alignItems="center" space={4}>
                <S.title>ás</S.title>
                <InputForm
                  icon="clock"
                  name="as"
                  error={errors.as}
                  control={control}
                  render={({ onChange, value }) => (
                    <S.input
                      placeholder="00:00"
                      type="text"
                      value={_hora(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
                {/* <S.input
                  onChangeText={setEndWorkHour}
                  value={endWorkHour}
                  keyboardType="numeric"
                  placeholder="00:00"
                  maxLength={5}
                /> */}
              </HStack>
            </HStack>

            <S.grid style={{ marginTop: 30 }}>
              {semana.map(h => (
                <S.box1
                  onPress={() => handleSelect(h)}
                  isSelect={weekWorkHour.findIndex(i => i.id === h.id) !== -1}
                  key={h.id}
                >
                  <S.titleSem>{h.week}</S.titleSem>
                </S.box1>
              ))}
            </S.grid>

            <ButtonConf
              load={loadWorkHour}
              onPress={handleSubmit(handleUpdateWorkHour)}
              title="SALVAR"
            />
          </S.box>

          {/* <S.box /> */}

          <S.box>
            <S.title>Editar folga</S.title>

            <HStack justifyContent="space-between" my="4">
              <Select
                selected={folga === 'DIARIA'}
                pres={() => setFolga('DIARIA')}
                variant="gray"
                title="diária"
              />
              <Select
                selected={folga === 'SEMANAL'}
                pres={() => setFolga('SEMANAL')}
                variant="gray"
                title="semanal"
              />
              <Select
                selected={folga === 'MENSAL'}
                pres={() => setFolga('MENSAL')}
                variant="gray"
                title="mensal"
              />
            </HStack>

            {folga === 'DIARIA' && (
              <VStack space={2}>
                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>dia</S.title>
                    <S.input
                      keyboardType="numeric"
                      placeholder="01"
                      onChangeText={setDayVocation}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>mês</S.title>
                    <S.input
                      onChangeText={setMonthVocation}
                      keyboardType="numeric"
                      placeholder="01"
                    />
                  </HStack>
                </HStack>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>
                    <S.input
                      onChangeText={setStartVocation}
                      value={startVocation}
                      keyboardType="numeric"
                      placeholder="00:00"
                      maxLength={5}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <S.input
                      onChangeText={setEndVocation}
                      value={endVocation}
                      keyboardType="numeric"
                      maxLength={5}
                      placeholder="00:00"
                    />
                  </HStack>
                </HStack>
              </VStack>
            )}

            {folga === 'SEMANAL' && (
              <VStack space={4}>
                <S.grid>
                  {semana.map(h => (
                    <S.box1
                      onPress={() => setWeekvocation(h.id)}
                      isSelect={weekVocation === h.id}
                      key={h.id}
                    >
                      <S.titleSem>{h.week}</S.titleSem>
                    </S.box1>
                  ))}
                </S.grid>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>

                    <S.input
                      onChangeText={setStartVocation}
                      value={startVocation}
                      keyboardType="numeric"
                      maxLength={5}
                      placeholder="00:00"
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <S.input
                      onChangeText={setEndVocation}
                      value={endVocation}
                      keyboardType="numeric"
                      maxLength={5}
                      placeholder="00:00"
                    />
                  </HStack>
                </HStack>
              </VStack>
            )}

            {folga === 'MENSAL' && (
              <VStack space={4}>
                <HStack alignItems="center" space={4}>
                  <S.title>Mês</S.title>
                  <S.input
                    onChangeText={setMonthVocation}
                    keyboardType="numeric"
                    placeholder="01"
                  />
                </HStack>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>
                    <S.input
                      onChangeText={setStartVocation}
                      value={startVocation}
                      keyboardType="numeric"
                      placeholder="00:00"
                      maxLength={5}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <S.input
                      onChangeText={setEndVocation}
                      value={endVocation}
                      keyboardType="numeric"
                      maxLength={5}
                      placeholder="00:00"
                    />
                  </HStack>
                </HStack>
              </VStack>
            )}

            <ButtonConf
              load={loadVocation}
              onPress={handleUpdateVocation}
              title="SALVAR"
            />
          </S.box>

          <S.box>
            <S.title>Minhas folgas</S.title>

            <FlashList
              data={listFolga}
              // Saving reference to the `FlashList` instance to later trigger `prepareForLayoutAnimationRender` method.
              ref={list}
              // This prop is necessary to uniquely identify the elements in the list.
              keyExtractor={(item: IArrayFolga) => {
                return item.id;
              }}
              renderItem={renderItem}
            />

            <ButtonConf title="SALVAR" />
          </S.box>

          <S.box>
            <S.title>Adicionar serviço</S.title>

            <S.input
              style={{ width: '100%', height: 40, margin: 5 }}
              placeholder="Nome do serviço"
              onChangeText={setNameService}
            />

            <S.input
              style={{ width: '100%', height: 40, margin: 5 }}
              keyboardType="numeric"
              placeholder="Tempo de execução exemp: 00:30m"
              onChangeText={setTimeService}
              value={timeService}
            />

            <S.input
              style={{ width: '100%', height: 40, margin: 5 }}
              keyboardType="numeric"
              placeholder="Valor R$"
              onChangeText={setAmoutService}
              value={amountService}
            />

            <ButtonConf
              load={loadService}
              onPress={handleCreateService}
              title="SALVAR"
            />
          </S.box>
        </ScrollView>
      </S.Container>
    </>
  );
}
