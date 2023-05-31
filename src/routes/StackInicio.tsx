import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Indication } from '../pages/Idication';
import { Inicio } from '../pages/Inicio';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackIndication() {
   return (
      <Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Screen name="inicio" component={Inicio} />
         <Screen name="indication" component={Indication} />
      </Navigator>
   );
}
