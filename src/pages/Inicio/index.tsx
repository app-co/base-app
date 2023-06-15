/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { useToken } from '../../contexts/Token';
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
import { locale } from '../../utils/LocalStrigMoney';
import { _currency, _number } from '../../utils/mask';
import { _subTitle } from '../../utils/size';
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

  const [load, setLoad] = React.useState(false);

  const { b2bListMe, b2bUpdate } = useB2b();
  const { orderTransactionListByPrestador } = useOrderTransaction();
  const { indicationListMe, indicationDelete } = useIndication();

  const [showOrderB2b, setShowOrderB2b] = React.useState(false);
  const [shwTransaction, setShowTransaction] = React.useState(false);
  const [showIndication, setShowIndication] = React.useState(false);

  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');
  const [valueType, setValueType] = React.useState<TTypeValue>();
  const [indexIndication, setIndexIndication] = React.useState(null);

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
        .filter((h, i) => h.id !== indexIndication);
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
    async (item: IB2b) => {
      setLoad(true);
      b2bUpdate(item.id!).then(h => {
        b2bListMe.refetch();
        setLoad(false);
      });
    },
    [b2bListMe, b2bUpdate],
  );

  const recuseOrderB2b = React.useCallback(
    async (id: string) => {
      setLoad(true);
      await deletB2b(id).then(() => {
        setLoad(false);
        b2bListMe.refetch();
      });
    },
    [deletB2b, b2bListMe],
  );

  const confirmatioTransaction = React.useCallback(
    async (item: IOrderTransaction) => {
      setLoad(true);
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
        setLoad(false);
      });
    },
    [aprovedOrderTransaction, orderTransactionListByPrestador],
  );

  const recuseTransactionOrder = React.useCallback(
    async (id: string) => {
      setLoad(true);
      await deleteOrderTransaction(id);
      orderTransactionListByPrestador.refetch();
      setLoad(false);
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
          setLoad(true);

          createTransaction(dados).then(() => {
            aprovedOrderIndication({
              id: item.id,
              who_indication: item.quemIndicou_id,
            }).then(() => {
              indicationListMe.refetch();
              setLoad(false);
            });
          });
          break;

        case 'not-yeat':
          setIndexIndication(item.id!);

          break;

        case 'not':
          setLoad(true);
          indicationDelete(item.id!).then(() => {
            setLoad(false);
            aprovedOrderIndication({
              id: item.id,
              who_indication: item.quemIndicou_id,
            });
          });

          break;

        default:
          break;
      }
    },
    [
      aprovedOrderIndication,
      createTransaction,
      description,
      indicationDelete,
      indicationListMe,
      user.id,
      user.nome,
      value,
      valueType,
    ],
  );

  const handledeleteIndication = React.useCallback(
    async (id: string) => {
      indicationDelete(id).then(() => {
        indicationListMe.refetch();
      });
    },
    [indicationDelete, indicationListMe],
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
      totalValorVenda = locale(String(rank.vendas.valor));
    }

    return { totalPonts, totalValorVenda };
  }, [indRank.isLoading, rank]);

  useFocusEffect(
    useCallback(() => {
      // setIndexIndication(null);
      openModalOrders();
      loadVendas();
      indRank.refetch();

      b2bListMe.refetch();
      indicationListMe.refetch();
      orderTransactionListByPrestador.refetch();
      // logOut();
    }, [loadVendas, openModalOrders]),
  );

  useFocusEffect(
    useCallback(() => {
      setIndexIndication(null);
    }, []),
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
        <ModalComp closed={() => setShowOrderB2b(false)} title="B2B">
          <FlatList
            data={orders.b2b}
            keyExtractor={h => String(h.id)}
            renderItem={({ item: h }) => (
              <ListB2bOrder
                load={load}
                name={h.send_name}
                description={h.assunto}
                confirmation={() => confirmatioOrderB2b(h)}
                recuse={() => recuseOrderB2b(h.id!)}
              />
            )}
          />
        </ModalComp>
      </Modal>

      <Modal visible={shwTransaction} animationType="fade" transparent>
        <ModalComp closed={() => setShowTransaction(false)} title="Consumo">
          <FlatList
            data={orders.transaction}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
              <ListTransactionOrder
                load={load}
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
            keyExtractor={h => h.id!}
            renderItem={({ item: h, index }) => (
              <OrderIndicationComp
                load={load}
                valueType={h => setValueType(h)}
                confirmation={() => handleIndication(h, index)}
                reject={() => deleteIndication(h.id!)}
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

      <Center>
        <S.text style={{ fontFamily: 'mediun', fontSize: _subTitle }}>
          {user.nome}
        </S.text>
        <S.text>{user.profile.workName}</S.text>
      </Center>

      <HStack space={10} justifyContent="center" my="4" alignItems="center">
        <Avatar size="xl" source={{ uri: user?.profile.avatar }} />

        <Box w="1" bg="black" h="full" />

        <Box alignItems="flex-end">
          <S.text>Vendas este ano:</S.text>
          <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
            {calculo.totalValorVenda}
          </S.text>

          <S.text>Meus pontos:</S.text>
          <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
            {calculo.totalPonts}
          </S.text>
        </Box>
      </HStack>

      <Center>
        <HStack space={2} alignItems="center">
          <S.text style={{ fontSize: _subTitle }}>Acumulados do GEB:</S.text>
          <S.text style={{ fontSize: _subTitle, fontFamily: 'medium' }}>
            {valorGeb?.priceGeb}
          </S.text>
        </HStack>
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
