/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Notifications from 'expo-notifications';
import {
  Avatar,
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  TextArea,
} from 'native-base';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';

// import * as Updates from 'expo-updates';

import { Classificacao } from '../../components/Classificacao';
import { Header } from '../../components/Header';
import { Input } from '../../components/Inputs';
import { ListB2bOrder } from '../../components/ListB2bOrder';
import { ListTransactionOrder } from '../../components/ListTransactionOrder';
import { ModalComp } from '../../components/ModalComp';
import { OrderIndicationComp } from '../../components/OrderIndicationComp';
import { useB2b } from '../../contexts/b2b';
import { useIndication } from '../../contexts/indication';
import { useOrderTransaction } from '../../contexts/orderTransaction';
import { useCreation } from '../../contexts/useCreation';
import { useData } from '../../contexts/useData';
import { useOrders } from '../../contexts/useOrders';
import {
  IB2b,
  IIndicationDto,
  IOrderTransaction,
  ISelfPonts,
  ITransaction,
} from '../../dtos';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { _currency, _number } from '../../utils/mask';
import * as S from './styles';

const wt = Dimensions.get('window').width;

type TTypeValue = 'not-yeat' | 'not' | 'handshak';

interface PropsValorTotal {
  priceUser: string;
  priceGeb: string;
}

export function Inicio() {
  const { user, logOut } = useAuth();
  const { indRank } = useData();
  const {
    aprovedB2b,
    deletB2b,
    aprovedOrderTransaction,
    deleteOrderTransaction,
    createTransaction,
    aprovedOrderIndication,
  } = useCreation();

  const { b2bListMe } = useB2b();
  const { orderTransactionListByPrestador } = useOrderTransaction();
  const { indicationListMe } = useIndication();

  console.log(b2bListMe.error, indicationListMe.error, 'ok');

  const [showOrderB2b, setShowOrderB2b] = React.useState(false);
  const [shwTransaction, setShowTransaction] = React.useState(false);
  const [showIndication, setShowIndication] = React.useState(false);

  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');
  const [valueType, setValueType] = React.useState<TTypeValue>();
  const [indexIndication, setIndexIndication] = React.useState(9999);

  const [valorGeb, setValorGeb] = React.useState<PropsValorTotal>();

  const orders = React.useMemo(() => {
    let b2b = (b2bListMe.data as IB2b[]) || [];
    let indication = (indicationListMe.data as IIndicationDto[]) || [];
    const transaction =
      (orderTransactionListByPrestador.data as IOrderTransaction[]) || [];

    if (!b2bListMe.isLoading) {
      b2b = b2b.filter(h => h.validate === false);
    }

    if (!indicationListMe.isLoading) {
      indication = indication
        .filter((h, i) => {
          if (h.validate === false) {
            return h;
          }
        })
        .filter((h, i) => i !== indexIndication);
    }

    return { b2b, transaction, indication };
  }, [
    b2bListMe.data,
    b2bListMe.isLoading,
    indicationListMe.data,
    indicationListMe.isLoading,
    orderTransactionListByPrestador.data,
    indexIndication,
  ]);

  const openModalOrders = React.useCallback(async () => {
    if (orders.b2b.length > 0) {
      setShowOrderB2b(true);
    }

    if (orders.transaction.length > 0) {
      setShowTransaction(true);
    }

    if (orders.indication.length > 0) {
      setShowIndication(true);
    }
  }, [orders.b2b.length, orders.transaction.length, orders.indication.length]);

  const confirmatioOrderB2b = React.useCallback(
    async (id: string) => {
      aprovedB2b(id).then(h => {
        b2bListMe.refetch();
      });
    },
    [aprovedB2b, b2bListMe],
  );

  const recuseOrderB2b = React.useCallback(
    async (id: string) => {
      await deletB2b(id);
      b2bListMe.refetch();
    },
    [deletB2b, b2bListMe],
  );

  const confirmatioTransaction = React.useCallback(
    async (item: IOrderTransaction) => {
      const dados = {
        consumidor_name: item.consumidor_id,
        consumidor_id: item.consumidor_id,
        prestador_name: item.prestador_name,
        prestador_id: item.prestador_id,
        descricao: item.descricao,
        order_id: item.id,
        valor: item.valor,
      };
      aprovedOrderTransaction(dados).then(h => {
        orderTransactionListByPrestador.refetch();
      });
    },
    [aprovedOrderTransaction, orderTransactionListByPrestador],
  );

  const recuseTransactionOrder = React.useCallback(
    async (id: string) => {
      await deleteOrderTransaction(id);
      orderTransactionListByPrestador.refetch();
    },
    [deleteOrderTransaction, orderTransactionListByPrestador],
  );

  const loadVendas = React.useCallback(async () => {
    await api.get('/transaction/list-all-transaction').then(h => {
      const res = h.data as ITransaction[];

      const valor = res.reduce((ac, i) => {
        return ac + i.valor;
      }, 0);

      const userTrans = res.filter(p => {
        return p.prestador_id === user.id;
      });

      const valorTotalUser = userTrans.reduce((ac, i) => {
        const v = i.valor;
        return ac + Number(v);
      }, 0);

      const vlorUser = valorTotalUser;

      const priceUser = vlorUser.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const t = valor + 7782628;

      const price = t.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const dados = {
        priceUser: priceUser || '0',
        priceGeb: price || '0',
      };

      setValorGeb(dados);
    });
  }, [user]);

  const handleIndication = React.useCallback(
    async (item: IIndicationDto, index: number) => {
      const valor =
        value.length < 6
          ? Number(_number(`${value},00`))
          : Number(_number(value));

      const dados = {
        prestador_id: user.id,
        prestador_name: user.nome,
        descricao: description,
        valor,
      };

      switch (valueType) {
        case 'handshak':
          createTransaction(dados).then(() => {
            aprovedOrderIndication({
              id: item.id,
              who_indication: item.quemIndicou_id,
            }).then(() => {
              indicationListMe.refetch();
            });
          });
          break;

        case 'not-yeat':
          setIndexIndication(index);

          break;

        case 'not':
          aprovedOrderIndication({
            id: item.id,
            who_indication: item.quemIndicou_id,
          }).then(() => {
            indicationListMe.refetch();
          });

          break;

        default:
          break;
      }
    },
    [],
  );

  const deleteIndication = React.useCallback(
    async (id: string) => {
      deleteIndication(id).then(() => {
        indicationListMe.refetch();
      });
    },
    [indicationListMe],
  );

  const rank = indRank.data as ISelfPonts;

  const calculo = React.useMemo(() => {
    let totalPonts = 0;
    let totalValorVenda = '0';

    if (!indRank.isLoading) {
      const b2b = rank.b2b.pontos;
      const indi = rank.indication.pontos;
      const vend = rank.vendas.pontos;
      const comp = rank.compras.pontos;
      const pres = rank.presenca.pontos;
      const apdr = rank.padrinho.pontos;

      totalPonts = b2b + indi + vend + comp + pres + apdr;
      totalValorVenda = _currency(String(rank.vendas.valor));
    }

    return { totalPonts, totalValorVenda };
  }, [rank]);

  useFocusEffect(
    useCallback(() => {
      setIndexIndication(999);
      openModalOrders();
      loadVendas();
    }, [openModalOrders]),
  );

  return (
    <S.Container>
      <Header
        openMail={openModalOrders}
        title="Home"
        orders={{
          b2b: orders.b2b.length,
          indication: orders.indication.length,
          transaction: orders.transaction.length,
        }}
      />
      {/* MODAL B2B */}
      <Modal visible={showOrderB2b} animationType="fade" transparent>
        <ModalComp closed={() => setShowOrderB2b(false)} title="">
          <FlatList
            data={orders.b2b}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
              <ListB2bOrder
                name={h.send_name}
                description={h.assunto}
                confirmation={() => confirmatioOrderB2b(h.id)}
                recuse={() => recuseOrderB2b(h.id)}
              />
            )}
          />
        </ModalComp>
      </Modal>

      <Modal visible={shwTransaction} animationType="fade" transparent>
        <ModalComp closed={() => setShowTransaction(false)} title="">
          <FlatList
            data={orders.transaction}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
              <ListTransactionOrder
                item={h}
                confirmation={() => confirmatioTransaction(h)}
                recuse={() => recuseTransactionOrder(h.id)}
              />
            )}
          />
        </ModalComp>
      </Modal>

      <Modal visible={showIndication} animationType="fade" transparent>
        <ModalComp closed={() => setShowIndication(false)} title="">
          <FlatList
            data={orders.indication}
            keyExtractor={h => h.id}
            renderItem={({ item: h, index }) => (
              <OrderIndicationComp
                valueType={h => setValueType(h)}
                confirmation={() => handleIndication(h, index)}
                reject={() => deleteIndication(h.id)}
                item={h}
                form={
                  <Form>
                    <Center m={10}>
                      <Input
                        placeholderTextColor="#b6b6b6"
                        name="name"
                        placeholder="Digite o valor que foi negociado"
                        onChangeText={h => setValue(_currency(h))}
                        value={value}
                        keyboardType="numeric"
                      />

                      <TextArea
                        w="64"
                        mt="2"
                        _focus={{
                          backgroundColor: theme.colors.secundary,
                          fontFamily: theme.fonts.regular,
                        }}
                        color="#fff"
                        placeholder="Descricão"
                        onChangeText={setDescription}
                        value={description}
                      />
                    </Center>
                  </Form>
                }
              />
            )}
          />
        </ModalComp>
      </Modal>

      <HStack mt="8">
        <Center px="5">
          <Avatar size="xl" source={{ uri: user?.profile.avatar }} />
        </Center>

        <Box justifyContent="center">
          <HStack>
            <Box>
              <S.text>Vendas este ano:</S.text>
              <S.text>Meus pontos:</S.text>
            </Box>

            <Box ml="1">
              <S.text>{calculo.totalValorVenda}</S.text>
              <S.text>{calculo.totalPonts}</S.text>
            </Box>
          </HStack>
        </Box>
      </HStack>
      <Center>
        <S.text style={{ marginTop: 15 }}>Acumulados do G.E.B:</S.text>
        <S.text>{valorGeb?.priceGeb}</S.text>
      </Center>

      <S.Line />

      {indRank.isLoading ? (
        <ActivityIndicator size={36} />
      ) : (
        <Classificacao item={rank} />
      )}
    </S.Container>
  );
}
