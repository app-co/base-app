/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-use-before-define */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import {
  Mitr_200ExtraLight as Light,
  Mitr_400Regular as Regular,
  Mitr_700Bold as Bold,
} from '@expo-google-fonts/mitr';

import { NativeBaseProvider } from 'native-base';

import { AuthContextProvider } from '@/hooks/AuthContext';
import { Routes } from '@/routes';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Light,
    Regular,
    Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </View>
  );
}
