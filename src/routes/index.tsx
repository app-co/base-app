import { NavigationContainer } from '@react-navigation/native';

// import { Loading } from '../components/Loading';
import { ActivityIndicator } from 'react-native';

import { Creation } from '../contexts/CreationContext';
import { useAuth } from '../hooks/useAuth';
import { SingIn } from '../pages/LogIn';
import { DrawerApp } from './DrawerApp';

export function Route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Creation>
          <DrawerApp />
        </Creation>
      ) : (
        <SingIn />
      )}
    </NavigationContainer>
  );
}
