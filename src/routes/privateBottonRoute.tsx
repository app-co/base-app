/* eslint-disable react/no-unstable-nested-components */
import * as Ico from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { _text } from '@/styles/sizes';
import { Agenda } from '@/pages/Agenda';

import { Clientes } from '../pages/Clientes';
import { Config } from '../pages/Config';
import { Home } from '../pages/Home';

const S = createBottomTabNavigator();

export function PrivateBottonRoute() {
  return (
    <S.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cor.light['glow-c'],
        tabBarLabelStyle: {
          fontFamily: 'Regular',
          fontSize: _text,
        },
        tabBarInactiveTintColor: cor.light['glow-b'],
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: cor.light.gray,
          height: 70,
        },
      }}
    >
      <S.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ico.HouseLine size={size} weight="duotone" color={color} />
          ),
        }}
      />

      <S.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ico.AddressBook size={size} weight="duotone" color={color} />
          ),
        }}
      />

      <S.Screen
        name="Clientes"
        component={Clientes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ico.Users size={size} weight="duotone" color={color} />
          ),
        }}
      />

      <S.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ico.Gear size={size} weight="duotone" color={color} />
          ),
        }}
      />
    </S.Navigator>
  );
}
