import { ActivityIndicator } from 'react-native';

import { Center } from 'native-base';

import { useAuth } from '@/hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../pages/Login';
import { PrivateDrawerRoute } from './privateDrawerRoutes';

export function Routes() {
  const { provider, loading } = useAuth();
  const user = true;
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
