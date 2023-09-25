/* eslint-disable react/no-unstable-nested-components */
import * as Ico from 'phosphor-react-native';

import { Appointment } from '@/pages/Appointment';
import { Extrato } from '@/pages/Extrato';
import { Profile } from '@/pages/Profile';
import { ProfileWork } from '@/pages/ProfileWork';
import { cor } from '@/styles/cor';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
            <Ico.Book
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Agendar para cliente"
        component={Appointment}
      />

      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.Book
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Rotina de trabalho"
        component={ProfileWork}
      />

      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.Book
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Meu perfil"
        component={Profile}
      />

      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.ChartBar
              weight="duotone"
              size={size}
              color={focused ? cor.light.black : cor.light.gray}
            />
          ),
        }}
        name="Performace"
        component={Extrato}
      />
    </S.Navigator>
  );
}
