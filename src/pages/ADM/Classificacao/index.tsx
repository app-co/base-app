/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { RFValue } from 'react-native-responsive-fontsize';
import { HeaderContaponent } from '../../../components/HeaderComponent';
import { Loading } from '../../../components/Loading';
import theme from '../../../global/styles/theme';
import { api } from '../../../services/api';
import {
   Box,
   BoxClassificacao,
   BoxFiltro,
   BoxLista,
   Container,
   TitleFiltro,
   TitleList,
   TitleType
} from './styles';

interface PropResponse {
   TP: PropsTotalPontos[];
   compras: Tips[];
   vendas: Tips[];
   presenca: Tips[];
   indication: Tips[];
   b2b: Tips[];
}

interface Tips {
   id: string;
   nome: string;
   pontos: number;
   rank: number;
}

interface PropsTotalPontos {
   name: string;
   totalPontos: number;
}

export function Ranking() {
   const modalEntradaSaida = useRef<Modalize>(null);
   const [type, setType] = useState('entrada');
   const [filtro, setFiltro] = useState('mes');
   const [load, setLoad] = useState(true);
   const [ponts, setPonts] = React.useState<PropResponse>();

   // todo entrada ...................
   useEffect(() => {
      async function load() {
         await api
            .get('/user/global-rank')
            .then(h => {
               const rs = h.data;

               setPonts(rs);
            })
            .catch(h => {
               const { message } = h.response.data;
               if (message === 'falta o token' || message === 'token expirou') {
                  return Alert.alert('Erro', 'sem token');
               }
            })
            .finally(() => setLoad(false));
      }

      load();
   }, []);

   return (
      <Container>
         <HeaderContaponent type="tipo1" title="Classificação" />
         {load ? (
            <Loading />
         ) : (
            <>
               {/* <Modalize ref={modalEntradaSaida}>
                  {extratoUser.map(h => (
                     <View key={h.createdAt}>
                        <ExtratoModal
                           data={h.createdAt}
                           descricao={h.descricao}
                           type={h.type}
                           valor={h.valor}
                        />
                     </View>
                  ))}
               </Modalize> */}
               <View
                  style={{
                     flexDirection: 'row',
                     padding: 25,
                  }}
               >
                  <ScrollView horizontal>
                     <Box
                        type={type === 'total'}
                        onPress={() => setType('total')}
                     >
                        <TitleType type={type === 'total'}>TOTAL</TitleType>
                     </Box>
                     <Box
                        type={type === 'entrada'}
                        onPress={() => setType('entrada')}
                     >
                        <TitleType type={type === 'entrada'}>VENDAS</TitleType>
                     </Box>

                     <Box
                        type={type === 'saida'}
                        onPress={() => setType('saida')}
                     >
                        <TitleType type={type === 'saida'}>COMPRAS</TitleType>
                     </Box>

                     <Box
                        type={type === 'indicaçao'}
                        onPress={() => setType('indicaçao')}
                     >
                        <TitleType type={type === 'indicaçao'}>
                           Indicações
                        </TitleType>
                     </Box>

                     <Box
                        type={type === 'presença'}
                        onPress={() => setType('presença')}
                     >
                        <TitleType type={type === 'presença'}>
                           Presença
                        </TitleType>
                     </Box>

                     <Box
                        type={type === 'padrinho'}
                        onPress={() => setType('padrinho')}
                     >
                        <TitleType type={type === 'padrinho'}>
                           Padrinho
                        </TitleType>
                     </Box>

                     <Box type={type === 'b2b'} onPress={() => setType('b2b')}>
                        <TitleType type={type === 'padrinho'}>B2B</TitleType>
                     </Box>
                  </ScrollView>
               </View>

               {type === 'entrada' && (
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: RFValue(36),
                     }}
                  >
                     <BoxFiltro
                        onPress={() => setFiltro('mes')}
                        filtro={filtro === 'mes'}
                     >
                        <TitleFiltro filtro={filtro === 'mes'}>MES</TitleFiltro>
                     </BoxFiltro>

                     <BoxFiltro
                        onPress={() => setFiltro('ano')}
                        filtro={filtro === 'ano'}
                     >
                        <TitleFiltro filtro={filtro === 'ano'}>Ano</TitleFiltro>
                     </BoxFiltro>

                     <BoxFiltro
                        onPress={() => setFiltro('todos')}
                        filtro={filtro === 'todos'}
                     >
                        <TitleFiltro filtro={filtro === 'todos'}>
                           Todos
                        </TitleFiltro>
                     </BoxFiltro>
                  </View>
               )}

               {type === 'saida' && (
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: RFValue(36),
                     }}
                  >
                     <BoxFiltro
                        onPress={() => setFiltro('mes')}
                        filtro={filtro === 'mes'}
                     >
                        <TitleFiltro filtro={filtro === 'mes'}>MES</TitleFiltro>
                     </BoxFiltro>

                     <BoxFiltro
                        onPress={() => setFiltro('ano')}
                        filtro={filtro === 'ano'}
                     >
                        <TitleFiltro filtro={filtro === 'ano'}>Ano</TitleFiltro>
                     </BoxFiltro>

                     <BoxFiltro
                        onPress={() => setFiltro('todos')}
                        filtro={filtro === 'todos'}
                     >
                        <TitleFiltro filtro={filtro === 'todos'}>
                           Todos
                        </TitleFiltro>
                     </BoxFiltro>
                  </View>
               )}

               <View style={{ marginTop: RFValue(20), paddingBottom: 200 }}>
                  {type === 'total' && (
                     <FlatList
                        data={ponts.TP}
                        keyExtractor={h => h.name}
                        renderItem={({ item: h, index }) => (
                           <TouchableOpacity
                              onPress={() => {}}
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {index + 1}
                                    </TitleList>
                                 </BoxClassificacao>

                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontuação
                                    </TitleList>
                                    <TitleList>{h.totalPontos} pts</TitleList>
                                 </View>
                              </BoxLista>
                           </TouchableOpacity>
                        )}
                     />
                  )}

                  {type === 'entrada' && (
                     <FlatList
                        data={ponts.vendas}
                        keyExtractor={h => h.id}
                        renderItem={({ item: h }) => (
                           <TouchableOpacity
                              onPress={() => {}}
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>

                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontuação
                                    </TitleList>
                                    <TitleList>{h.pontos} pts</TitleList>
                                 </View>
                              </BoxLista>
                           </TouchableOpacity>
                        )}
                     />
                  )}

                  {type === 'saida' && (
                     <FlatList
                        data={ponts.compras}
                        keyExtractor={h => h.id}
                        renderItem={({ item: h }) => (
                           <View
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>
                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontuação
                                    </TitleList>
                                    <TitleList>{h.pontos} pts</TitleList>
                                 </View>
                              </BoxLista>
                           </View>
                        )}
                     />
                  )}

                  {type === 'indicaçao' && (
                     <FlatList
                        data={ponts.indication}
                        keyExtractor={h => h.id}
                        renderItem={({ item: h }) => (
                           <View
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>
                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontuação
                                    </TitleList>
                                    <TitleList>{h.pontos} pts </TitleList>
                                 </View>
                              </BoxLista>
                           </View>
                        )}
                     />
                  )}

                  {type === 'presença' && (
                     <FlatList
                        data={ponts.presenca}
                        keyExtractor={h => h.id}
                        renderItem={({ item: h }) => (
                           <View
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>
                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontuação
                                    </TitleList>
                                    <TitleList>{h.pontos} pts</TitleList>
                                 </View>
                              </BoxLista>
                           </View>
                        )}
                     />
                  )}

                  {/*


                  {type === 'padrinho' && (
                     <FlatList
                        data={Padrinho}
                        keyExtractor={h => h.user_id}
                        renderItem={({ item: h }) => (
                           <View
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>
                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontos
                                    </TitleList>
                                    <TitleList>{h.pontos} </TitleList>
                                 </View>
                              </BoxLista>
                           </View>
                        )}
                     />
                  )}

                  */}

                  {type === 'b2b' && (
                     <FlatList
                        data={ponts.b2b}
                        keyExtractor={h => h.id}
                        renderItem={({ item: h }) => (
                           <View
                              style={{
                                 paddingBottom: 20,
                                 marginTop: 10,
                              }}
                           >
                              <BoxLista>
                                 <BoxClassificacao>
                                    <TitleList
                                       style={{
                                          fontSize: 26,
                                          color: theme.colors.text_secundary,
                                       }}
                                    >
                                       {h.rank}
                                    </TitleList>
                                 </BoxClassificacao>
                                 <View
                                    style={{
                                       flex: 1,
                                       marginLeft: 20,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(20),
                                          fontFamily: theme.fonts.blac,
                                       }}
                                    >
                                       {' '}
                                       {h.nome}{' '}
                                    </TitleList>
                                    <TitleList> {} </TitleList>
                                 </View>

                                 <View
                                    style={{
                                       alignItems: 'center',
                                       flex: 1,
                                    }}
                                 >
                                    <TitleList
                                       style={{
                                          fontSize: RFValue(16),
                                          fontFamily: theme.fonts.blac,
                                          textAlign: 'center',
                                       }}
                                    >
                                       Pontos
                                    </TitleList>
                                    <TitleList>{h.pontos} </TitleList>
                                 </View>
                              </BoxLista>
                           </View>
                        )}
                     />
                  )}
               </View>
            </>
         )}
      </Container>
   );
}
