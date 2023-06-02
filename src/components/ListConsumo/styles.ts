import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

const { colors, fonts } = theme;
export const Container = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  width: 100%;
  height: ${RFPercentage(10)}px;
  background-color: ${colors.primary};
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${RFValue(20)}px;
`;

export const BoxData = styled.View`
  width: ${RFPercentage(14)}px;
  height: ${RFPercentage(9)}px;
  border-radius: ${RFValue(30)}px;
  background-color: ${colors.focus};
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const TextData = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${colors.text_secundary};
  text-align: center;
`;

export const BoxValor = styled.View`
  width: ${RFPercentage(30)}px;
  background-color: ${colors.focus};
  border-radius: ${RFValue(10)}px;
  padding: 0 10px;
  justify-content: space-around;
`;

export const TextValue = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${colors.text_secundary};
`;
