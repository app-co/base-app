import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';

import { Login } from '../pages/Login';
import { PrivateDrawerRoute } from './privateDrawerRoutes';

import { Center } from 'native-base';

import { ActivityIndicator } from 'react-native';

export function Routes() {
  const { provider, loading } = useAuth();

  if (loading) {
    return (
      <Center flex="1">
        <ActivityIndicator size={50} />
      </Center>
    );
  }
  return (
    <NavigationContainer>
      {provider ? <PrivateDrawerRoute /> : <Login />}
    </NavigationContainer>
  );
}
