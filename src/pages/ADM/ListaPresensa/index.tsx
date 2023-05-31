/* eslint-disable camelcase */
import React from 'react';
import { Text, Box, FlatList, HStack, Center } from 'native-base';
import fire from '@react-native-firebase/firestore';
import { addMonths, format, subMonths } from 'date-fns';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CardsPresença } from '../../../components/CardsPresença';
import { HeaderContaponent } from '../../../components/HeaderComponent';
import { useAuth } from '../../../hooks/AuthContext';

interface IProps {
   nome: string;
   avatar: string;
   createdAt?: number;
   user_id?: string;
   presenca?: boolean;
}

export function ListaPresença() {
   const {} = useAuth();
   const [data, setData] = React.useState<IProps[]>([]);
   const [selectdate, setSelectDate] = React.useState(new Date());

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

   React.useEffect(() => {}, []);

   const Month = React.useMemo(() => {
      const month = format(selectdate, 'MM/yy');
      return month;
   }, [selectdate]);
   return (
      <Box flex={1}>
         <HeaderContaponent type="tipo1" title="LISTA DE PRESENÇA" />

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
            {/* <FlatList
               contentContainerStyle={{
                  paddingBottom: 200,
               }}
               data={data}
               keyExtractor={h => h.nome}
               renderItem={({ item: h }) => (
                  <CardsPresença nome={h.nome} avatar={h.avatar} qnt={h.qnt} />
               )}
            /> */}
         </Box>
      </Box>
   );
}
