import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

interface PropsType {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;

  justify-content: space-between;
`;

export const title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${theme.fonts.bold};
`;

export const text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${theme.fonts.regular};
`;

export const textButon = styled.Text`
  color: #fff;
`;

export const buttonType = styled.TouchableOpacity<PropsType>`
  padding: 5px 10px;
  background-color: ${h =>
    h.selected ? theme.colors.focus : theme.colors.focus_light};
  border-radius: 5px;
`;

export const box = styled.View``;
