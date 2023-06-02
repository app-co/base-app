import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

const { colors, fonts } = theme;

export const Container = styled.View``;

export const Title = styled.Text`
  color: ${colors.text};
  font-family: ${fonts.regular};

  font-size: ${RFValue(18)}px;
  margin-left: ${RFValue(30)}px;
`;

export const ButtonToggle = styled.TouchableOpacity`
  width: 50%;
  height: 35px;

  background-color: ${colors.focus};
`;

export const TitleTogle = styled.Text`
  color: ${colors.text_secundary};
  font-family: ${fonts.regular};

  font-size: ${RFValue(18)}px;
`;

export const BxName = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  /* justify-content:  */
  padding: 15px;

  background-color: ${colors.primary};
`;

export const Avatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: 30px;

  background-color: ${colors.focus};
`;

export const Line = styled.View`
  width: 90%;
  height: 2px;
  align-self: center;

  background-color: ${colors.focus};
`;
