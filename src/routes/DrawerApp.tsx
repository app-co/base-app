/* eslint-disable react/no-unstable-nested-components */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../components/DrawerComponent';
import theme from '../global/styles/theme';
import { useAuth } from '../hooks/useAuth';
import { Inicio } from '../pages/Inicio';
import { rotas, rotasAdm } from '../utils/rotas';
import { StackIndication } from './StackInicio';

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerApp() {
  const { user } = useAuth();
  // const { adm } = user.user;
  return (
    <Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="home"
              size={size}
              color={
                focused
                  ? theme.colors.focus_second
                  : theme.colors.focus_second_3
              }
            />
          ),
        }}
        name="INÍCIO"
        component={Inicio}
      />
      {rotas.map(h => (
        <Screen
          key={h.name}
          options={{
            drawerIcon: ({ focused, size }) => (
              <FontAwesome
                name={h.icon}
                size={size}
                color={focused ? h.focus : h.color}
              />
            ),
          }}
          name={h.name}
          component={h.component}
        />
      ))}

      {user.adm &&
        rotasAdm.map(h => (
          <Screen
            key={h.name}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Feather name={h.icon} size={size} color="red" />
              ),
            }}
            name={h.name}
            component={h.component}
          />
        ))}
    </Navigator>
  );
}
