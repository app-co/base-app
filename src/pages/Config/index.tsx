import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LayoutAnimation, Pressable, TextInput } from 'react-native';

import { getDate, getMonth, getYear } from 'date-fns';
import { Box, HStack, ScrollView, Toast, useToast, VStack } from 'native-base';
import * as y from 'yup';

import { Input } from '@/components/Input';
import { InputForm } from '@/components/InputForm';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { _hora, _money, _stringToNumber } from '@/utils/mask/hora';
import { _hourToMinutis } from '@/utils/unidades';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlashList } from '@shopify/flash-list';

import { ButtonConf } from '../../components/ButtonConf';
import { Menu } from '../../components/Menu';
import { Select } from '../../components/Select';
import {
  daySchemeVocation,
  monthSchemeVocation,
  serviceScheme,
  weekSchemeVocation,
  workScheme,
} from './schemes';
import * as S from './styles';

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
  day: string;
  month: string;
};

type TService = {};

type TVocationData = {};

export function Config() {
  const workControll = useForm({ resolver: yupResolver<TForm>(workScheme) });

  const vocationWeek = useForm({
    resolver: yupResolver<TForm>(weekSchemeVocation),
  });

  const vocationMonth = useForm({
    resolver: yupResolver<TForm>(monthSchemeVocation),
  });

  const vocationDay = useForm({
    resolver: yupResolver<TForm>(daySchemeVocation),
  });

  const serviceControll = useForm({ resolver: yupResolver(serviceScheme) });

  const { provider, updateUser } = useAuth();
  const toast = useToast();
  const [folga, setFolga] = React.useState<TVocation>('DIARIA');

  const [loadWorkHour, setLoadWorkHour] = React.useState(false);
  const [loadService, setLoadService] = React.useState(false);
  const [loadVocation, setLoadVocation] = React.useState(false);

  // work hours
  const [weekWorkHour, setWeekWorkHour] = React.useState<IWeek[]>([]);

  // vocation
  const [weekVocation, setWeekvocation] = React.useState(7);

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
      setLoadWorkHour(true);
      const from = _hourToMinutis(data.das);
      const at = _hourToMinutis(data.as);
      const week = weekWorkHour.map(h => h.id);
      try {
        await api.post('/workhour', {
          from,
          at,
          week,
          fk_provider_id: provider.id,
        });

        toast.show({
          title: 'Legal',
          description: 'Sua jornada de trabalho foi alterada com sucesso',
          placement: 'top',
          bgColor: 'green.500',
        });

        updateUser();

        setLoadWorkHour(false);
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
    [provider.id, toast, weekWorkHour],
  );

  const handleUpdateVocation = React.useCallback(
    async (data: TForm) => {
      setLoadVocation(true);

      const dateVariable: any = {
        DIARIA: {
          start: `${data.day}:${data.month}:${getYear(new Date())}:${data.das}`,
          end: `${data.day}:${data.month}:${getYear(new Date())}:${data.as}`,
        },
        SEMANAL: {
          start: `${getDate(new Date())}:${getMonth(new Date())}:${getYear(
            new Date(),
          )}:${data.das}`,
          end: `${getDate(new Date())}:${getMonth(new Date())}:${getYear(
            new Date(),
          )}:${data.as}`,
        },
        MENSAL: {
          start: `${getDate(new Date())}:${data.month}:${getYear(new Date())}:${
            data.das
          }`,
          end: `${getDate(new Date())}:${data.month}:${getYear(new Date())}:${
            data.as
          }`,
        },
      };

      const dt = {
        start: dateVariable[folga].start,
        end: dateVariable[folga].end,
        weekend: [weekVocation],
        prestadorId: provider.id,
        type: folga,
      };

      try {
        await api.post('/vocation-create', dt);

        toast.show({
          title: 'Legal!',
          description: 'Sua folga foi salva',
          placement: 'top',
          bgColor: 'green.500',
        });

        updateUser();
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
    [folga, provider.id, toast, updateUser, weekVocation],
  );

  const handleCreateService = React.useCallback(
    async (data: TService) => {
      setLoadService(true);
      const amount = _stringToNumber(data.value);
      const duration = _hourToMinutis(data.time);

      try {
        await api.post('/service', {
          name: data.name.trim(),
          amount,
          duration,
          fk_provider_id: provider.id,
          description: data.description,
        });

        toast.show({
          title: 'Legal!',
          description: 'Serviço salvo com sucesso.',
          placement: 'bottom',
          bgColor: 'green.500',
        });

        updateUser();
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
    },
    [provider.id, toast],
  );

  const variable: any = {
    DIARIA: vocationDay.handleSubmit(handleUpdateVocation),
    SEMANAL: vocationWeek.handleSubmit(handleUpdateVocation),
    MENSAL: vocationMonth.handleSubmit(handleUpdateVocation),
  };

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
                  error={workControll.formState.errors.das}
                  control={workControll.control}
                  render={({ onChange, value }) => (
                    <S.input
                      keyboardType="numeric"
                      placeholder="00:00"
                      type="text"
                      value={_hora(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
              </HStack>

              <HStack alignItems="center" space={4}>
                <S.title>ás</S.title>
                <InputForm
                  icon="clock"
                  name="as"
                  error={workControll.formState.errors.as}
                  control={workControll.control}
                  render={({ onChange, value }) => (
                    <S.input
                      placeholder="00:00"
                      keyboardType="numeric"
                      type="text"
                      value={_hora(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
              </HStack>
            </HStack>

            <S.grid style={{ marginTop: 30 }}>
              {semana.map(h => (
                <S.box1
                  onPress={() => handleSelect(h)}
                  isSelect={weekWorkHour.findIndex(i => i.id === h.id) !== -1}
                  key={h.id}
                >
                  <S.titleSem
                    isSelect={weekWorkHour.findIndex(i => i.id === h.id) !== -1}
                  >
                    {h.week}
                  </S.titleSem>
                </S.box1>
              ))}
            </S.grid>

            <ButtonConf
              load={loadWorkHour}
              onPress={workControll.handleSubmit(handleUpdateWorkHour)}
              title="SALVAR"
            />
          </S.box>

          {/* <S.box /> */}

          <S.box>
            <S.title>Editar folga</S.title>

            <HStack justifyContent="space-between" my="4">
              <Select
                selected={folga === 'DIARIA'}
                pres={() => {
                  setFolga('DIARIA');
                }}
                variant="gray"
                title="diária"
              />
              <Select
                selected={folga === 'SEMANAL'}
                pres={() => {
                  setFolga('SEMANAL');
                }}
                variant="gray"
                title="semanal"
              />
              <Select
                selected={folga === 'MENSAL'}
                pres={() => {
                  setFolga('MENSAL');
                }}
                variant="gray"
                title="mensal"
              />
            </HStack>

            {folga === 'DIARIA' && (
              <VStack space={2}>
                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>dia</S.title>
                    <InputForm
                      icon="clock"
                      name="day"
                      error={vocationDay.formState.errors.day}
                      control={vocationDay.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder={`${getDate(new Date())}`}
                          keyboardType="numeric"
                          type="text"
                          value={value}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLenght={2}
                        />
                      )}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>mês</S.title>
                    <InputForm
                      icon="clock"
                      name="month"
                      error={vocationDay.formState.errors.month}
                      control={vocationDay.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder={`${getMonth(new Date())}`}
                          keyboardType="numeric"
                          type="text"
                          value={value}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLenght={2}
                        />
                      )}
                    />
                  </HStack>
                </HStack>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>
                    <InputForm
                      icon="clock"
                      name="das"
                      error={vocationDay.formState.errors.das}
                      control={vocationDay.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          keyboardType="numeric"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <InputForm
                      icon="clock"
                      name="as"
                      error={vocationDay.formState.errors.as}
                      control={vocationDay.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          keyboardType="numeric"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
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
                      <S.titleSem isSelect={weekVocation === h.id}>
                        {h.week}
                      </S.titleSem>
                    </S.box1>
                  ))}
                </S.grid>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>
                    <InputForm
                      icon="clock"
                      name="das"
                      error={vocationWeek.formState.errors.das}
                      control={vocationWeek.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          keyboardType="numeric"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <InputForm
                      icon="clock"
                      name="as"
                      error={vocationWeek.formState.errors.as}
                      control={vocationWeek.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          keyboardType="numeric"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
                    />
                  </HStack>
                </HStack>
              </VStack>
            )}

            {folga === 'MENSAL' && (
              <VStack space={4}>
                <HStack alignItems="center" space={4}>
                  <S.title>Mês</S.title>
                  <InputForm
                    icon="clock"
                    name="month"
                    error={vocationMonth.formState.errors.das}
                    control={vocationMonth.control}
                    render={({ onChange, value }) => (
                      <S.input
                        placeholder="00"
                        type="text"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                        maxLength={2}
                      />
                    )}
                  />
                </HStack>

                <HStack mt="4" w="full" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <S.title>das</S.title>
                    <InputForm
                      icon="clock"
                      name="das"
                      error={vocationMonth.formState.errors.das}
                      control={vocationMonth.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
                    />
                  </HStack>

                  <HStack alignItems="center" space={4}>
                    <S.title>ás</S.title>
                    <InputForm
                      icon="clock"
                      name="as"
                      error={vocationMonth.formState.errors.as}
                      control={vocationMonth.control}
                      render={({ onChange, value }) => (
                        <S.input
                          placeholder="00:00"
                          type="text"
                          value={_hora(value)}
                          keyboardType="numeric"
                          onChangeText={onChange}
                          maxLength={5}
                        />
                      )}
                    />
                  </HStack>
                </HStack>
              </VStack>
            )}

            {}

            <ButtonConf
              load={loadVocation}
              onPress={variable[folga]}
              title="SALVAR"
            />
          </S.box>

          {/* <S.box>
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
          </S.box> */}

          <S.box>
            <S.title>Adicionar serviço</S.title>
            <InputForm
              icon="clock"
              name="name"
              error={serviceControll.formState.errors.name}
              control={serviceControll.control}
              render={({ onChange, value }) => (
                <S.input
                  style={{ width: '100%', height: 40, margin: 5 }}
                  placeholder="Nome do serviço"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <InputForm
              icon="clock"
              name="description"
              error={serviceControll.formState.errors.description}
              control={serviceControll.control}
              render={({ onChange, value }) => (
                <S.input
                  style={{ width: '100%', height: 40, margin: 5 }}
                  placeholder="Descrição do serviço"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <InputForm
              icon="clock"
              name="time"
              error={serviceControll.formState.errors.time}
              control={serviceControll.control}
              render={({ onChange, value }) => (
                <S.input
                  style={{ width: '100%', height: 40, margin: 5 }}
                  keyboardType="numeric"
                  placeholder="Tempo de execução exp: 00:30"
                  type="text"
                  value={_hora(value)}
                  onChangeText={onChange}
                />
              )}
            />

            <InputForm
              icon="clock"
              name="value"
              error={serviceControll.formState.errors.value}
              control={serviceControll.control}
              render={({ onChange, value }) => (
                <S.input
                  style={{ width: '100%', height: 40, margin: 5 }}
                  placeholder="Valor do serviço R$"
                  keyboardType="numeric"
                  type="text"
                  value={_money(value)}
                  onChangeText={onChange}
                />
              )}
            />

            <ButtonConf
              load={loadService}
              onPress={serviceControll.handleSubmit(handleCreateService)}
              title="SALVAR"
            />
          </S.box>
        </ScrollView>
      </S.Container>
    </>
  );
}
