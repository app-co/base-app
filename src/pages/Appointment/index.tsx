import React from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Modal, ScrollView, ActivityIndicator } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Line } from 'react-native-svg';

import { getDate, getMonth, set } from 'date-fns';
import { Box, Center, HStack, Toast, useToast, VStack } from 'native-base';
import { XCircle } from 'phosphor-react-native';
import * as y from 'yup';

import { Button } from '@/components/Button';
import { InputForm } from '@/components/InputForm';
import { Menu } from '@/components/Menu';
import { IClient } from '@/dtos';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

const scheme = y.object({
  client_name: y.string().required('Nome é obrigatório'),
});

export function Appointment() {
  const { provider, updateUser } = useAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(scheme) });

  const [client, setClient] = React.useState<IClient>();

  const [selectedDate, setSelectedDate] = React.useState<string | Date>(
    new Date(),
  );
  const [load, setLoad] = React.useState(false);
  const [hours, setHours] = React.useState<string[]>([]);
  const [clietsData, setClientsData] = React.useState<IClient[]>([]);
  const [modaClient, setModalClient] = React.useState(false);
  const [nameClient, setNameClient] = React.useState(client?.name || '');

  const [selectHour, setSelectHour] = React.useState('');
  const [selectService, setSelectService] = React.useState('');

  const loadAvaliableAppointment = React.useCallback(async () => {
    setLoad(true);
    try {
      const dt = {
        providerId: provider.id,
        day: getDate(new Date(selectedDate)),
        month: getMonth(new Date(selectedDate)),
        service: selectService,
      };

      const { data } = await api.get('appointment-avaliable', {
        params: dt,
      });
      setHours(data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      const isErr = error instanceof AppError;
      if (isErr) {
        toast.show({
          title: 'Erro ao carregar os horários',
          description: error.message,
          bgColor: 'red.900',
          placement: 'bottom',
        });
      }
    }
  }, [provider.id, selectService, selectedDate]);

  React.useEffect(() => {
    api.get('/client').then(h => {
      setClientsData(h.data);
    });
  }, []);

  React.useEffect(() => {
    loadAvaliableAppointment();
  }, []);

  const submit = React.useCallback(async () => {
    setLoad(true);
    const [hora, min] = selectHour.split(':').map(Number);
    const date = set(new Date(selectedDate), {
      hours: hora,
      minutes: min,
    });

    try {
      const dt = {
        date,
        service: selectService,
        fk_provider_id: provider.id,
        client_name: nameClient.trim(),
      };

      await api.post('/appointment', dt);

      toast.show({
        title: 'Sucesso',
        description: 'O agendamento foi marcado para o seu cliente',
        bg: 'green.800',
        placement: 'bottom',
      });
      setLoad(false);
      loadAvaliableAppointment();
      updateUser();
    } catch (error) {
      setLoad(false);
      const isErr = error instanceof AppError;

      if (isErr) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bgColor: 'red.900',
          placement: 'bottom',
        });
      }
    }
  }, [nameClient, provider.id, selectHour, selectService, selectedDate, toast]);

  return (
    <S.Container>
      <Menu />

      <Modal transparent visible={load}>
        <Center flex="1">
          <ActivityIndicator size={45} color={cor.light['glow-c']} />
        </Center>
      </Modal>

      <Modal animationType="fade" visible={modaClient}>
        <Box bg={cor.light.gray} flex="1" p="8">
          <HStack justifyContent="space-between" alignItems="center">
            <S.title>Lista de clientes</S.title>
            <S.touch onPress={() => setModalClient(false)}>
              <XCircle color={cor.light.black} size={35} />
            </S.touch>
          </HStack>

          <VStack mt="10" space={4}>
            <FlatList
              data={clietsData}
              keyExtractor={h => h.id}
              renderItem={({ item: h }) => (
                <S.touch
                  onPress={() => {
                    setModalClient(false);
                    setClient(h);
                    setNameClient(h.name);
                  }}
                >
                  <Box
                    borderBottomColor={cor.light['glow-c']}
                    alignItems="flex-start"
                    borderWidth={1}
                    borderTopColor={cor.light.gray}
                    borderLeftColor={cor.light.gray}
                    paddingBottom={2}
                  >
                    <S.subTitle>{h.name}</S.subTitle>
                    <S.text>{h.cell}</S.text>
                  </Box>
                </S.touch>
              )}
            />
          </VStack>
        </Box>
      </Modal>

      <S.title>Agende um horário para seus clientes</S.title>

      <ScrollView>
        <S.content>
          <S.touch
            onPress={() => setModalClient(true)}
            style={{ backgroundColor: cor.light['glow-b'], width: 200 }}
          >
            <S.subTitle style={{ textAlign: 'center' }}>
              Ver lista de clientes
            </S.subTitle>
          </S.touch>

          <Box my="4">
            <InputForm
              icon="clock"
              name="client_name"
              error={errors.client_name}
              control={control}
              render={({ onChange, value }) => (
                <S.input
                  placeholder="Nome do cliente"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Box>
          <S.subTitle>Escolha um serviço</S.subTitle>

          <S.services>
            {provider.Service.map(h => (
              <S.boxSelectService
                selected={selectService === h.name}
                onPress={() => setSelectService(h.name)}
              >
                <S.text>{h.name}</S.text>
              </S.boxSelectService>
            ))}
          </S.services>

          <S.boxCalendar>
            <S.subTitle style={{ marginBottom: 10 }}>
              Escolha uma data
            </S.subTitle>
            <CalendarPicker
              onDateChange={h => setSelectedDate(h.format())}
              selectedDayColor={cor.light['glow-c']}
              width={350}
            />
          </S.boxCalendar>

          <S.boxHours>
            <S.subTitle>Escolha um horário</S.subTitle>
            <FlatList
              horizontal
              data={hours}
              keyExtractor={h => h}
              renderItem={({ item: h }) => (
                <S.boxSelectHours
                  selected={selectHour === h}
                  onPress={() => setSelectHour(h)}
                >
                  <S.text>{h}</S.text>
                </S.boxSelectHours>
              )}
            />
          </S.boxHours>

          <Button onPress={handleSubmit(submit)} title="SALVAR" />
        </S.content>
      </ScrollView>
    </S.Container>
  );
}
