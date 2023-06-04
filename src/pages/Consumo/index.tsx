/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  addDays,
  addMonths,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  subDays,
  subMonths,
} from 'date-fns';
import { Box, Center, HStack } from 'native-base';
import React, { useContext, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colecao } from '../../collection';
import { Header } from '../../components/Header';
import { ListConsumo } from '../../components/ListConsumo';
import { useB2b } from '../../contexts/b2b';
import { useDonate } from '../../contexts/donate';
import { useIndication } from '../../contexts/indication';
import { useInvit } from '../../contexts/invit';
import { usePadrinho } from '../../contexts/padrinho';
import { usePresenca } from '../../contexts/presenca';
import { useTransaction } from '../../contexts/transaction';
import {
  IB2b,
  IDonate,
  IGuest,
  IIndicationDto,
  IPadrinho,
  IPresencaDto,
  ITransaction,
  IUserDto,
} from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import * as S from './styles';

export interface PropTransactions {
  id: string;
  prestador_id: string;
  consumidor: string;
  descricao: string;
  type: 'entrada' | 'saida';
  valor: string;
  createdAt: string;
}

interface IQntGeral {
  qntPadrinho: number;
  qntPresenca: number;
  qntIndicacao: number;
  user_id: string;
}

type Presença = {
  nome: string;
  data: string;
  status: string;
};

type TType =
  | 'entrada'
  | 'saida'
  | 'presenca'
  | 'padrinho'
  | 'b2b'
  | 'guest'
  | 'donate'
  | 'indication';

const types = [
  { type: 'entrada', name: 'Entrada', id: '1' },
  { type: 'saida', name: 'Saida', id: '2' },
  { type: 'indication', name: 'Indicações', id: '8' },
  { type: 'presenca', name: 'Presença', id: '3' },
  { type: 'b2b', name: 'B2B', id: '5' },
  { type: 'guest', name: 'Convidados', id: '6' },
  { type: 'donate', name: 'Donativos', id: '7' },
  { type: 'padrinho', name: 'Padrinho', id: '4' },
];

export function Consumo() {
  const [transactionP, setTransactionP] = useState<ITransaction[]>([]);
  const [transactionC, setTransactionC] = useState<ITransaction[]>([]);
  const [type, setType] = useState<TType>('entrada');

  const [date, setDate] = React.useState(new Date());

  const { transactionListByPrestador, transactionListByClient } =
    useTransaction();

  const { user } = useAuth();
  const { indicationListMe } = useIndication();
  const { presencaListAll } = usePresenca();
  const { b2bListMe } = useB2b();
  const { invitListAll } = useInvit();
  const { donateListAll } = useDonate();
  const { padrinhoListMe } = usePadrinho();

  const handlePlus = React.useCallback(async () => {
    const dt = addDays(date, 1);

    setDate(dt);
  }, [date]);

  const handleMinus = React.useCallback(async () => {
    const dt = subDays(date, 1);

    setDate(dt);
  }, [date]);

  //* *..........................................................................

  const listTransaction = React.useCallback(async () => {
    const vp = 0;
    const vl = 0;
    const prestador = (transactionListByPrestador.data as ITransaction[]) || [];
    const client = (transactionListByClient.data as ITransaction[]) || [];
    try {
      const ft = prestador
        .map(p => {
          const { valor } = p;

          const valorFormated = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return {
            ...p,
            date: format(new Date(p.created_at!), 'dd-MM-yyyy'),
            valorFormated,
            valor,
          };
        })
        .filter(h => {
          const rsDate = format(new Date(h.created_at!), 'dd/MM/yy');
          const currencydate = format(date, 'dd/MM/yy');

          if (rsDate === currencydate) {
            return h;
          }
        });
      setTransactionP(ft);

      const rsClient = client
        .map(p => {
          const { valor } = p;
          const valorFormated = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          return {
            ...p,
            date: format(new Date(p.created_at!), 'dd-MM-yyyy'),
            valorFormated,
            valor,
          };
        })
        .filter(h => {
          const rsDate = format(new Date(h.created_at!), 'dd/MM/yy');
          const currencydate = format(date, 'dd/MM/yy');

          if (rsDate === currencydate) {
            return h;
          }
        });
      setTransactionC(rsClient);
    } catch (err) {
      console.log(err.response);
    }
  }, [date, transactionListByClient.data, transactionListByPrestador.data]);

  React.useEffect(() => {
    listTransaction();
  }, [listTransaction]);

  const currencyDateFormated = format(date, 'dd/MM/yy');

  const extrato = React.useMemo(() => {
    const prestador = transactionP;

    const consumidor = transactionC;

    let subTotalP = 0;
    let subTotalC = 0;

    prestador.forEach(h => {
      subTotalP += h.valor;
    });

    consumidor.forEach(h => {
      subTotalC += h.valor;
    });

    const totalP = subTotalP.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const totalC = subTotalC.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return {
      prestador,
      consumidor,
      totalP,
      totalC,
    };
  }, [transactionC, transactionP]);

  //* *..........................................................................

  const indicationList = React.useMemo(() => {
    const indication = (indicationListMe.data as IIndicationDto[]) || [];
    const ind: IIndicationDto[] = [];

    indication.forEach(h => {
      const rsDate = format(new Date(h.createdAt!), 'dd/MM/yy');
      if (rsDate === currencyDateFormated && h.validate === true) {
        const dt = {
          ...h,
          date: rsDate,
        };
        ind.push(dt);
      }
    });

    return { ind };
  }, [currencyDateFormated, indicationListMe.data]);

  const presencaList = React.useMemo(() => {
    const presenca = (presencaListAll.data as IPresencaDto[]) || [];
    const ind: IIndicationDto[] = [];

    presenca.forEach(h => {
      const rsDate = format(new Date(h.createdAt!), 'dd/MM/yy');
      if (
        rsDate === currencyDateFormated &&
        h.presenca === true &&
        h.user_id === user.id
      ) {
        const dt = {
          ...h,
          date: rsDate,
        };
        ind.push(dt);
      }
    });

    return { ind };
  }, [currencyDateFormated, presencaListAll.data, user.id]);

  const list = React.useMemo(() => {
    const b2bL = (b2bListMe.data as IB2b[]) || [];
    const b2b: IB2b[] = [];

    const guest = (invitListAll.data as IGuest[]) || [];
    const invit: IGuest[] = [];

    const listDonate = (donateListAll.data as IDonate[]) || [];
    const donate: IDonate[] = [];

    const padrinhoL = (padrinhoListMe.data as IPadrinho[]) || [];
    const padrinho: IPadrinho[] = [];

    b2bL.forEach(h => {
      const dt = format(new Date(h.createdAt!), 'dd/MM/yy');

      if (h.validate === true && dt === currencyDateFormated) {
        const rs = {
          ...h,
          date: dt,
        };
        b2b.push(rs);
      }
    });

    guest.forEach(h => {
      const dt = format(new Date(h.created_at!), 'dd/MM/yy');

      if (
        h.approved === true &&
        dt === currencyDateFormated &&
        h.fk_user_id === user.id
      ) {
        const rs = {
          ...h,
          date: dt,
        };
        invit.push(rs);
      }
    });

    listDonate.forEach(h => {
      const dt = format(new Date(h.created_at!), 'dd/MM/yy');

      if (
        h.approved === true &&
        dt === currencyDateFormated &&
        h.fk_id_user === user.id
      ) {
        const rs = {
          ...h,
          date: dt,
        };
        donate.push(rs);
      }
    });

    padrinhoL.forEach(h => {
      const dt = format(new Date(h.created_at!), 'dd/MM/yy');

      padrinho.push(h);
    });

    return { b2b, invit, donate, padrinho };
  }, [
    b2bListMe.data,
    currencyDateFormated,
    donateListAll.data,
    invitListAll.data,
    padrinhoListMe.data,
    user.id,
  ]);

  return (
    <S.Container>
      <Header />

      <View style={{ height: 70 }}>
        <ScrollView
          horizontal
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            height: 70,
            paddingHorizontal: 20,
          }}
        >
          <S.BoxTypeTransaction>
            {types.map(h => (
              <S.BoxTypeTransactionTouch
                type={h.type === type}
                onPress={() => setType(h.type)}
                key={h.id}
              >
                <S.TextTypeTransaction type={h.type === type}>
                  {h.name}
                </S.TextTypeTransaction>
              </S.BoxTypeTransactionTouch>
            ))}
          </S.BoxTypeTransaction>
        </ScrollView>
      </View>

      <HStack
        w="full"
        mb="4"
        justifyContent="space-around"
        alignItems="center"
        p="2"
        px="4"
      >
        <TouchableOpacity style={{ padding: 3 }} onPress={handleMinus}>
          <MaterialIcons name="arrow-back-ios" size={34} color="black" />
        </TouchableOpacity>

        <Center>
          <S.text>{currencyDateFormated}</S.text>
          <S.title>{format(date, 'dd')}</S.title>
          <S.reloaded onPress={() => setDate(new Date())}>
            <S.text style={{ color: '#fff' }}>AUTALIZAR</S.text>
          </S.reloaded>
        </Center>

        <TouchableOpacity style={{ padding: 3 }} onPress={handlePlus}>
          <MaterialIcons name="arrow-forward-ios" size={34} color="black" />
        </TouchableOpacity>
      </HStack>

      <S.BoxTotal>
        {type === 'saida' && <S.title style={{ color: '#fff' }}>Total</S.title>}
        {type === 'entrada' && (
          <S.title style={{ color: '#fff' }}>Total</S.title>
        )}
        {type === 'entrada' && <S.Text>{extrato.totalP}</S.Text>}
        {type === 'saida' && <S.Text>{extrato.totalC}</S.Text>}
        {type === 'indication' && <S.Text>Suas inidicações</S.Text>}
        {type === 'presenca' && <S.Text>Suas presenças</S.Text>}
        {type === 'padrinho' && <S.Text>Seus afilhiados</S.Text>}
        {type === 'b2b' && <S.Text>Seus B2Bs</S.Text>}
        {type === 'donate' && <S.Text>Seus donativos</S.Text>}
        {type === 'guest' && <S.Text>Seus convidados</S.Text>}
      </S.BoxTotal>

      {type === 'entrada' && (
        <FlatList
          data={transactionP}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <View>
              <ListConsumo
                descricao={h.descricao}
                valor={h.valorFormated!}
                data={h.date!}
              />
            </View>
          )}
        />
      )}

      {type === 'saida' && (
        <FlatList
          data={extrato.consumidor}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <View>
              <ListConsumo
                descricao={h.descricao}
                valor={h.valorFormated!}
                data={h.date!}
              />
            </View>
          )}
        />
      )}

      {type === 'indication' && (
        <FlatList
          data={indicationList.ind}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <View>
              <ListConsumo
                descricao={h.description}
                valor={h.indicado_name}
                data={h.date!}
              />
            </View>
          )}
        />
      )}

      {type === 'presenca' && (
        <FlatList
          data={presencaList.ind}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <Box p={4} bg={theme.colors.focus_light} my="1">
              <HStack>
                <S.title style={{ color: '#fff' }}>{h.date}</S.title>
              </HStack>
            </Box>
          )}
        />
      )}

      {type === 'b2b' && (
        <FlatList
          data={list.b2b}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <Box p={4} bg={theme.colors.focus_light} my="1">
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <S.title style={{ color: '#fff' }}>{h.date}</S.title>

                <Box>
                  <S.title style={{ color: '#fff' }}>
                    B2B realizado com:
                  </S.title>
                  <S.text style={{ color: '#fff' }}>{h.send_name}</S.text>
                </Box>
              </HStack>
            </Box>
          )}
        />
      )}

      {type === 'guest' && (
        <FlatList
          data={list.invit}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <Box p={4} bg={theme.colors.focus_light} my="1">
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <S.title style={{ color: '#fff' }}>{h.date}</S.title>

                <Box>
                  <S.title style={{ color: '#fff' }}>Convidado:</S.title>
                  <S.text style={{ color: '#fff' }}>{h.name_convidado}</S.text>
                </Box>
              </HStack>
            </Box>
          )}
        />
      )}

      {type === 'padrinho' && (
        <FlatList
          data={list.padrinho}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <Box p={4} bg={theme.colors.focus_light} my="1">
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <S.title style={{ color: '#fff' }}>Afilhiado:</S.title>
                  <S.text style={{ color: '#fff' }}>
                    {h.apadrinhado_name}
                  </S.text>
                </Box>
              </HStack>
            </Box>
          )}
        />
      )}

      {type === 'donate' && (
        <FlatList
          data={list.donate}
          keyExtractor={h => String(h.id)}
          renderItem={({ item: h }) => (
            <Box p={4} bg={theme.colors.focus_light} my="1">
              <HStack space={3} w="full" alignItems="center">
                <S.title style={{ color: '#fff' }}>{h.date}</S.title>

                <Box px="2" flex="1">
                  <S.title style={{ color: '#fff', alignSelf: 'center' }}>
                    Itens:
                  </S.title>

                  <Box>
                    <S.text style={{ color: '#fff' }}>{h.itens}</S.text>
                  </Box>
                </Box>
              </HStack>
            </Box>
          )}
        />
      )}
    </S.Container>
  );
}
