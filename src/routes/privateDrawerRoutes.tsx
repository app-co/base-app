/* eslint-disable react/no-unstable-nested-components */
import * as Ico from 'phosphor-react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { cor } from '@/styles/cor';

import { DrawerContent } from '../components/DrawerComp';
import { Login } from '../pages/Login';
import { PrivateBottonRoute } from './privateBottonRoute';

const S = createDrawerNavigator();

export function PrivateDrawerRoute() {
  return (
    <S.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerActiveBackgroundColor: cor.light['glow-c'],
        drawerInactiveBackgroundColor: cor.light['glow-b'],
        drawerInactiveTintColor: cor.light.gray,
        drawerActiveTintColor: cor.light.black,
        drawerLabelStyle: {
          fontFamily: 'Bold',
        },
        headerShown: false,
      }}
    >
      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.HouseLine
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Início"
        component={PrivateBottonRoute}
      />

      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.HouseLine
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Login"
        component={Login}
      />
    </S.Navigator>
  );
}
