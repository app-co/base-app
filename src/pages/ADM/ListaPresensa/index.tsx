/* eslint-disable camelcase */
import { MaterialIcons } from '@expo/vector-icons';
import { addMonths, format, subMonths } from 'date-fns';
import { Text, Box, FlatList, HStack, Center } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { Header } from '../../../components/Header';
import { ListMembro } from '../../../components/ListMembro';
import { useData } from '../../../contexts/useData';
import { IPresencaDto, IUserDtos } from '../../../dtos';

interface IProps {
  nome: string;
  avatar: string;
  createdAt?: number;
  user_id?: string;
  presenca?: boolean;
}

export function ListaPresença() {
  const [data, setData] = React.useState<IProps[]>([]);
  const [selectdate, setSelectDate] = React.useState(new Date());
  const { users } = useData();
  const [presenca, setPresenca] = useState<Props[]>([]);
  const [load, setLoad] = React.useState(true);

  const listOrdersPresenca = React.useCallback(async () => {
    await api.get('/user/list-all-user').then(async user => {
      const membro = user.data as IUserDtos[];

      users.data
        .then(async presenca => {
          const rs = presenca.data as IPresencaDto[];

          const response = rs
            .filter(fil => {
              const profile = membro.find(h => {
                console.log(h.id);
                if (h.id === fil.user_id) {
                  return h;
                }
              });

              if (profile) {
                return fil;
              }
            })
            .map(respo => {
              const profile = membro.find(h => {
                if (h.id === respo.user_id) {
                  return h;
                }
              });
              return {
                presenca: {
                  ...respo,
                  data: format(new Date(respo.createdAt), 'dd/MM/yy'),
                },
                profile: {
                  avatar: profile.profile.avatar,
                },
              };
            })
            .filter(h => h !== undefined);
          setPresenca(response);
        })
        .catch(h => console.log('erro ao carregar presenca', h))
        .finally(() => setLoad(false));
    });
  }, []);

  const handleChangeMonth = React.useCallback(
    (action: 'prev' | 'next') => {
      if (action === 'prev') {
        setSelectDate(subMonths(selectdate, 1));
      } else {
        setSelectDate(addMonths(selectdate, 1));
      }
    },
    [selectdate],
  );

  const handleValidatePresensa = useCallback(
    async ({ nome, user_id }: IPresencaDto) => {
      const dados = {
        user_id,
        nome,
        presenca: true,
      };
      await api
        .post('/presenca/create-presenca', dados)
        .then(() => {
          listOrdersPresenca();
        })
        .catch(h => Alert.alert('Erro', h.response.data));
    },
    [listOrdersPresenca],
  );

  const handleDescartar = useCallback(
    async (id: string) => {
      await api
        .delete(`presenca/delete-order/${id}`)
        .then(h => {
          Alert.alert('Sucesso!', 'presensa cancelada com sucesso');
          listOrdersPresenca();
        })
        .catch(h => Alert.alert('Erro', h.response.data.message));
    },
    [listOrdersPresenca],
  );

  const Month = React.useMemo(() => {
    const month = format(selectdate, 'MM/yy');
    return month;
  }, [selectdate]);
  return (
    <Box flex={1}>
      <Header />

      <Box>
        <Center>
          <HStack space={30}>
            <TouchableOpacity onPress={() => handleChangeMonth('prev')}>
              <MaterialIcons name="arrow-left" size={55} />
            </TouchableOpacity>

            <Center>
              <Text>{Month}</Text>
            </Center>

            <TouchableOpacity onPress={() => handleChangeMonth('next')}>
              <MaterialIcons name="arrow-right" size={55} />
            </TouchableOpacity>
          </HStack>
        </Center>
      </Box>

      <Box>
        <FlatList
          data={presenca}
          keyExtractor={h => h.presenca.id}
          renderItem={({ item: h }) => (
            <ListMembro
              descartar={() => {
                handleDescartar(h.presenca.id);
              }}
              confirmar="Confirmar"
              nome={h.presenca.nome}
              data={h.presenca.data}
              avatar={h.profile.avatar}
              pres={() =>
                handleValidatePresensa({
                  nome: h.presenca.nome,
                  user_id: h.presenca.user_id,
                })
              }
            />
          )}
        />
      </Box>
    </Box>
  );
}
