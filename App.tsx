import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

import { Routes } from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex="1">
        <Routes />
      </Box>
    </NativeBaseProvider>
  );
}
