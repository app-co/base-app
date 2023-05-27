import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home';

const S = createNativeStackNavigator();

export function Stack() {
  return (
    <S.Navigator>
      <S.Screen component={Home} name="home" />
    </S.Navigator>
  );
}
