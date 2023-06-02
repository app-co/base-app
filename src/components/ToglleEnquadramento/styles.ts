import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

const { colors, fonts } = theme;
export const Container = styled.View`
  background-color: ${colors.secundary};
  flex: 1;
  padding: 15px;
`;

export const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const TitleDescricao = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${colors.text};
`;

export const Box = styled.TouchableOpacity`
  width: 100%;
  height: ${RFPercentage(10)}px;
  background-color: ${colors.primary};
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
`;
