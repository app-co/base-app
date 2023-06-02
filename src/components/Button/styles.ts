import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

export const Container = styled.TouchableOpacity`
  width: ${RFValue(270)}px;
  height: ${50}px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.focus};
  font-size: ${RFValue(18)}px;
`;
