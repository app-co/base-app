import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../../global/styles/theme';

const { colors, fonts } = theme;

interface Props {
  isAdm: boolean;
}

export const Container = styled.KeyboardAvoidingView`
  /* flex: 1; */
  background-color: ${theme.colors.primary};
`;

export const Box = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 9,
  },
  shadowOpacity: 0.48,
  shadowRadius: 11.95,

  elevation: 18,
})`
  width: 100%;
  min-height: ${RFPercentage(40)}px;
  background-color: ${colors.secundary};
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
`;

export const BoxInput = styled.View`
  padding: 20px 0 30px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${colors.focus};
`;

export const Logo = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(150)}px;
`;

export const BoxAdm = styled.TouchableOpacity<Props>`
  width: ${RFValue(25)}px;
  height: ${RFValue(25)}px;
  border-radius: ${RFValue(14)}px;
  background-color: ${({ isAdm }) =>
    isAdm ? colors.focus_second : colors.primary};

  border-width: 2px;
  border-color: ${colors.focus};
  align-self: flex-end;
  margin-left: 10px;
`;

export const ContainerInput = styled.View`
  width: ${RFValue(200)}px;
  height: ${RFValue(40)}px;
  background-color: ${colors.primary};

  border-radius: 10px;
  margin-bottom: 20px;
  justify-content: center;
  padding: 0 10px;
`;

export const BxPadrinho = styled.TouchableOpacity`
  width: 60%;
  height: 40px;

  border-radius: 12px;
  background-color: ${colors.secundary};
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-left: ${RFValue(25)}px;
`;
