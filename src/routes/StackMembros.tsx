import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Membros } from '../pages/Membros';
import { Sucess } from '../pages/Sucess';
import { Transaction } from '../pages/Transaction';

const Stak = createNativeStackNavigator();
export function StacKMembros() {
  return (
    <Stak.Navigator screenOptions={{ headerShown: false }}>
      <Stak.Screen name="Membros" component={Membros} />
      <Stak.Screen name="Transaction" component={Transaction} />
      <Stak.Screen name="sucess" component={Sucess} />
    </Stak.Navigator>
  );
}
