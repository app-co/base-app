import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.focus};
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${theme.colors.focus};
`;

export const Message = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${theme.colors.primary};
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(50)}px;
  background-color: ${theme.colors.primary};
  border-radius: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(106)}px;
`;

export const Image = styled.Image`
  position: absolute;
  width: ${RFValue(200)}px;
  height: ${RFValue(120)}px;
  opacity: 0.4;
  top: ${60}px;
`;
