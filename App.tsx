/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  BarlowCondensed_400Regular as regular,
  BarlowCondensed_500Medium as medium,
  BarlowCondensed_700Bold as bold,
  useFonts,
} from '@expo-google-fonts/barlow-condensed';

import 'react-native-gesture-handler';

import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import {
  Box,
  Button as ButtonBase,
  Center,
  NativeBaseProvider,
  Text,
} from 'native-base';
import React, { useRef } from 'react';
import { ActivityIndicator, AppState, LogBox, Modal, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import theme from './src/global/styles/theme';
import { AuthContextProvider } from './src/hooks/AuthContext';
import { Route } from './src/routes';
import { update } from './src/utils/updates';

export default function App() {
  const appState = useRef(AppState.currentState);

  const [appVisible, setAppVisible] = React.useState(appState.current);
  const [showModalUpdate, setModalUpdates] = React.useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  //* * UPDATE APLICATION ....................................................

  const ChecUpdadeDevice = React.useCallback(async () => {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      setModalUpdates(true);
    }
  }, []);

  const ReloadDevice = React.useCallback(async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }, []);

  React.useEffect(() => {
    const event = AppState.addEventListener('change', h => {
      if (h === 'active') {
        ChecUpdadeDevice();
      }
    });
    return () => {
      event.remove();
    };
  }, [ChecUpdadeDevice]);

  //* * .......................................................................

  const [loaded] = useFonts({
    medium,
    bold,
    regular,
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Box flex="1">
              <StatusBar style="light" />
              <Modal visible={showModalUpdate}>
                <Center p="5" bg={theme.colors.primary}>
                  <Box>
                    <Text fontFamily={theme.fonts.bold} fontSize="16">
                      UMA NOVA ATUALIZAÇÃO ESTA DISPONÍVEL
                    </Text>
                    {/* {update.map(h => (
                      <Text>{h.title}</Text>
                    ))} */}
                  </Box>
                  <ButtonBase onPress={ReloadDevice} mt="10">
                    ATUALIZAR
                  </ButtonBase>
                </Center>
              </Modal>
              <Route />
            </Box>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
