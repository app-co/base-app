/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import React, {
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { FlatList, ScrollView, TextInput, View } from 'react-native';
import { format, getMonth, getYear } from 'date-fns';

import { useFocusEffect } from '@react-navigation/native';

import fire from '@react-native-firebase/firestore';
import {
   BoxFiltros,
   BoxFiltroTouch,
   BoxTotal,
   BoxTypeTransaction,
   BoxTypeTransactionTouch,
   Container,
   Flat,
   Text,
   TextFiltro,
   TextTypeTransaction,
} from './styles';
import { ListConsumo } from '../../components/ListConsumo';
import { HeaderContaponent } from '../../components/HeaderComponent';
import { useAuth } from '../../hooks/AuthContext';
import { locale } from '../../utils/LocalStrigMoney';
import { ITransaction, IUserDto } from '../../dtos';
import theme from '../../global/styles/theme';
import { colecao } from '../../collection';
import { api } from '../../services/api';
import { ApiContext } from '../../contexts';

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

interface IIndication {
   id: string;
   posicao: string;
   qntPosicao: number;
}

type Presença = {
   nome: string;
   data: string;
   status: string;
};

export function Consumo() {
   const { transactionConsumidor, transactionPrestador } =
      useContext(ApiContext);

   const [transactionP, setTransactionP] = useState<ITransaction[]>([]);
   const [transactionC, setTransactionC] = useState<ITransaction[]>([]);
   const [type, setType] = useState('entrada');
   const [filtro, setFiltro] = useState('mes');
   const [presenca, setPresenca] = useState<Presença[]>([]);
   const [indicacao, setIndicacao] = useState<IIndication>();
   const [qntGeral, setQntGeral] = useState<IQntGeral[]>([]);
   const [qntB2b, setQntB2b] = useState<[]>([]);

   const { user } = useAuth();

   //* *..........................................................................

   const listTransaction = React.useCallback(async () => {
      const vp = 0;
      const vl = 0;
      try {
         await api.get('transaction/list-by-prestador').then(h => {
            const rs = h.data as ITransaction[];
            const ft = rs.map(p => {
               const { valor } = p;

               const valorFormated = valor.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               });
               return {
                  ...p,
                  date: format(new Date(p.created_at), 'dd-MM-yyyy'),
                  valorFormated,
                  valor,
               };
            });
            setTransactionP(ft);
         });

         await api.get('transaction/list-by-consumidor').then(h => {
            const rs = h.data as ITransaction[];
            const ft = rs.map(p => {
               const { valor } = p;
               const valorFormated = valor.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               });
               return {
                  ...p,
                  date: format(new Date(p.created_at), 'dd-MM-yyyy'),
                  valorFormated,
                  valor,
               };
            });
            setTransactionC(ft);
         });
      } catch (err) {
         console.log(err);
      }
   }, []);

   React.useEffect(() => {
      listTransaction();
   }, [listTransaction]);

   const extrato = React.useMemo(() => {
      const month = new Date(Date.now()).getMonth() + 1;
      const year = new Date(Date.now()).getFullYear();
      const day = new Date(Date.now()).getDate();

      const prestador = transactionP.filter(h => {
         const [dia, mes, ano, hora, menutos] = h.date.split('-').map(Number);

         if (filtro === 'mes' && month === mes) {
            return {
               ...h,
            };
         }

         if (filtro === 'ano' && ano === year) {
            return {
               ...h,
            };
         }

         if (filtro === 'todos') {
            return {
               ...h,
            };
         }
      });

      const subTotalP = prestador.reduce((ac, item) => {
         return ac + item.valor;
      }, 0);

      const totalP = subTotalP.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      });

      const consumidor = transactionC.filter(h => {
         const [dia, mes, ano, hora, menutos] = h.date.split('-').map(Number);

         if (filtro === 'mes' && month === mes) {
            return {
               ...h,
            };
         }

         if (filtro === 'ano' && ano === year) {
            return {
               ...h,
            };
         }

         if (filtro === 'todos') {
            return {
               ...h,
            };
         }
      });

      const subTotalC = consumidor.reduce((ac, item) => {
         return ac + item.valor;
      }, 0);

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
   }, [filtro, transactionC, transactionP]);

   //* *..........................................................................

   // todo VENDA ................................................................
   // const venda = useMemo(() => {
   //    return response.filter(h => {
   //       return h.prestador_id === user.id;
   //    });
   // }, [response, user.id]);

   // const formatedVenda = useMemo(() => {
   // const res = venda.filter(h => {
   //    const [dia, mes, ano, hora, menutos] = h.createdAt
   //       .split('-')
   //       .map(Number);
   //    const month = new Date(Date.now()).getMonth() + 1;
   //    const year = new Date(Date.now()).getFullYear();
   //    const day = new Date(Date.now()).getDate();
   //    if (filtro === 'mes' && month === mes) {
   //       return {
   //          ...h,
   //       };
   //    }
   //    if (filtro === 'ano' && ano === year) {
   //       return {
   //          ...h,
   //       };
   //    }
   //    if (filtro === 'todos') {
   //       return {
   //          ...h,
   //       };
   //    }
   // });
   //    // return res.map(h => {
   //    //    const [dia, mes, ano, hora, menutos] = h.createdAt
   //    //       .split('-')
   //    //       .map(Number);
   //    //    const total = Number(h.valor).toLocaleString('pt-BR', {
   //    //       style: 'currency',
   //    //       currency: 'BRL',
   //    //    });
   //    //    return {
   //    //       ...h,
   //    //       total,
   //    //       data: `${dia}/${mes}/${ano}`,
   //    //    };
   //    // });
   // }, []);

   // todo ......................................................................

   // const Consumidor = useMemo(() => {
   //    return response.filter(h => {
   //       return h.consumidor === user.id;
   //    });
   // }, [user]);

   // const formatedConsumidor = useMemo(() => {
   //    const res = Consumidor.filter(h => {
   //       const [dia, mes, ano, hora, menutos] = h.createdAt
   //          .split('-')
   //          .map(Number);

   //       const month = new Date(Date.now()).getMonth() + 1;
   //       const year = new Date(Date.now()).getFullYear();
   //       const day = new Date(Date.now()).getDate();

   //       if (filtro === 'mes' && month === mes) {
   //          return {
   //             ...h,
   //          };
   //       }

   //       if (filtro === 'ano' && ano === year) {
   //          return {
   //             ...h,
   //          };
   //       }

   //       if (filtro === 'todos') {
   //          return {
   //             ...h,
   //          };
   //       }
   //    });

   //    return res.map(h => {
   //       const [dia, mes, ano, hora, menutos] = h.createdAt
   //          .split('-')
   //          .map(Number);
   //       const total = Number(h.valor).toLocaleString('pt-BR', {
   //          style: 'currency',
   //          currency: 'BRL',
   //       });

   //       return {
   //          ...h,
   //          total,
   //          data: `${dia}/${mes}/${ano}`,
   //       };
   //    });
   // }, [Consumidor, filtro]);

   // const handleTotalPrestador = useMemo(() => {
   //    const tota = formatedVenda.reduce((acc, ind) => {
   //       return acc + Number(ind.valor);
   //    }, 0);
   //    const no = Number(tota).toLocaleString('pt-BR', {
   //       style: 'currency',
   //       currency: 'BRL',
   //    });

   //    return no;
   // }, [formatedVenda]);

   // const handleTotalConsumidor = useMemo(() => {
   //    const tota = formatedConsumidor.reduce((acc, ind) => {
   //       return acc + Number(ind.valor);
   //    }, 0);

   //    return locale(String(tota));
   // }, [formatedConsumidor]);

   // const QntGeral = useCallback(async () => {
   //    fire()
   //       .collection(colecao.users)
   //       .get()
   //       .then(res => {
   //          const users = res.docs.map(h => {
   //             return h.data() as IUserDto;
   //          });

   //          fire()
   //             .collection(colecao.presenca)
   //             .get()
   //             .then(res => {
   //                const data = res.docs
   //                   .map(h => h.data())
   //                   .filter(p => p.user_id === user.id && p.presenca === true);

   //                const resP = res.docs
   //                   .map(h => h.data())
   //                   .filter(p => p.user_id === user.id);

   //                setPresenca(
   //                   resP.map(h => {
   //                      return {
   //                         nome: h.nome,
   //                         data: format(
   //                            new Date(h.createdAt),
   //                            'dd/MM/yyyy - HH:mm',
   //                         ),
   //                         status: h.presenca ? 'validado' : 'pendente',
   //                      };
   //                   }),
   //                );

   //                const filter = users.map(h => {
   //                   const p = data.length + 2;
   //                   return {
   //                      qntPadrinho: h.padrinhQuantity,
   //                      qntPresenca: p,
   //                      qntIndicacao: h.indicacao,
   //                      user_id: h.id,
   //                   };
   //                });

   //                setQntGeral(filter);
   //             });
   //       });
   // }, [user.id]);

   return (
      <Container>
         <HeaderContaponent type="tipo1" title="Extrato" />

         <View style={{ height: 70 }}>
            <ScrollView
               horizontal
               style={{
                  flex: 1,
               }}
               contentContainerStyle={{
                  height: 70,
               }}
            >
               <BoxTypeTransaction>
                  <BoxTypeTransactionTouch
                     type={type === 'entrada'}
                     onPress={() => setType('entrada')}
                  >
                     <TextTypeTransaction type={type === 'entrada'}>
                        Entrada
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>

                  <BoxTypeTransactionTouch
                     type={type === 'saida'}
                     onPress={() => setType('saida')}
                  >
                     <TextTypeTransaction type={type === 'saida'}>
                        Saida
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>

                  <BoxTypeTransactionTouch
                     type={type === 'indicaçao'}
                     onPress={() => setType('indicaçao')}
                  >
                     <TextTypeTransaction type={type === 'indicaçao'}>
                        Indicações
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>

                  <BoxTypeTransactionTouch
                     type={type === 'presença'}
                     onPress={() => setType('presença')}
                  >
                     <TextTypeTransaction type={type === 'presença'}>
                        Presença
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>

                  <BoxTypeTransactionTouch
                     type={type === 'padrinho'}
                     onPress={() => setType('padrinho')}
                  >
                     <TextTypeTransaction type={type === 'padrinho'}>
                        Padrinho
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>

                  <BoxTypeTransactionTouch
                     type={type === 'b2b'}
                     onPress={() => setType('b2b')}
                  >
                     <TextTypeTransaction type={type === 'b2b'}>
                        B2B
                     </TextTypeTransaction>
                  </BoxTypeTransactionTouch>
               </BoxTypeTransaction>
            </ScrollView>
         </View>

         {type === 'entrada' && (
            <BoxFiltros>
               <BoxFiltroTouch
                  filtro={filtro === 'mes'}
                  onPress={() => setFiltro('mes')}
               >
                  <TextFiltro filtro={filtro === 'mes'}>Mes</TextFiltro>
               </BoxFiltroTouch>

               <BoxFiltroTouch
                  filtro={filtro === 'ano'}
                  onPress={() => setFiltro('ano')}
               >
                  <TextFiltro filtro={filtro === 'ano'}>Ano</TextFiltro>
               </BoxFiltroTouch>

               <BoxFiltroTouch
                  filtro={filtro === 'todos'}
                  onPress={() => setFiltro('todos')}
               >
                  <TextFiltro filtro={filtro === 'todos'}>Todos</TextFiltro>
               </BoxFiltroTouch>
            </BoxFiltros>
         )}

         {type === 'saida' && (
            <BoxFiltros>
               <BoxFiltroTouch
                  filtro={filtro === 'mes'}
                  onPress={() => setFiltro('mes')}
               >
                  <TextFiltro filtro={filtro === 'mes'}>Mes</TextFiltro>
               </BoxFiltroTouch>

               <BoxFiltroTouch
                  filtro={filtro === 'ano'}
                  onPress={() => setFiltro('ano')}
               >
                  <TextFiltro filtro={filtro === 'ano'}>Ano</TextFiltro>
               </BoxFiltroTouch>

               <BoxFiltroTouch
                  filtro={filtro === 'todos'}
                  onPress={() => setFiltro('todos')}
               >
                  <TextFiltro filtro={filtro === 'todos'}>Todos</TextFiltro>
               </BoxFiltroTouch>
            </BoxFiltros>
         )}

         <BoxTotal>
            <Text>Total</Text>
            {type === 'entrada' && <Text>{extrato.totalP}</Text>}
            {type === 'saida' && <Text>{extrato.totalC}</Text>}
            {type === 'indicaçao' && <Text>em manutenção</Text>}
            {type === 'presença' && <Text>em manutenção</Text>}
            {type === 'padrinho' && <Text>em manutenção</Text>}
            {type === 'b2b' && <Text>em manutenção</Text>}
         </BoxTotal>

         {type === 'entrada' && (
            <FlatList
               data={transactionP}
               keyExtractor={h => h.id}
               renderItem={({ item: h }) => (
                  <View>
                     <ListConsumo
                        descricao={h.descricao}
                        valor={h.valorFormated}
                        data={h.date}
                     />
                  </View>
               )}
            />
         )}

         {type === 'saida' && (
            <FlatList
               data={extrato.consumidor}
               keyExtractor={h => h.id}
               renderItem={({ item: h }) => (
                  <View>
                     <ListConsumo
                        descricao={h.descricao}
                        valor={h.valorFormated}
                        data={h.date}
                     />
                  </View>
               )}
            />
         )}

         {/* 
         {type === 'presença' && (
            <View style={{ marginTop: 24, flex: 1 }}>
               <FlatList
                  contentContainerStyle={{
                     paddingBottom: 50,
                  }}
                  data={presenca}
                  keyExtractor={h => h.data}
                  renderItem={({ item: h }) => (
                     <View
                        style={{
                           backgroundColor: theme.colors.focus_light,
                           marginTop: 16,
                           padding: 20,
                        }}
                     >
                        <Text style={{ fontSize: 16 }}>{h.nome}</Text>
                        <Text style={{ fontSize: 16 }}>{h.data}</Text>
                        <Text style={{ fontSize: 16 }}>{h.status}</Text>
                     </View>
                  )}
               />
            </View>
         )} */}
      </Container>
   );
}
