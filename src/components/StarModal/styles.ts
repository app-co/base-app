import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { w } from '../../utils/size';

export const Container = styled.View`
  background-color: ${theme.colors.focus};
  padding: 20px;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const title = styled.Text`
  margin: 10px;
  color: #fff;
  font-size: ${RFValue(18)}px;
  margin-top: ${w * 0.1}px;
`;

export const star = styled(FontAwesome)`
  color: ${theme.colors.focus_second};
  font-size: ${RFValue(30)}px;
`;

export const boxH = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  align-self: center;

  width: ${w * 0.6}px;

  margin: 30px;
`;

export const logo = styled.Image`
  width: ${w * 0.7}px;
  height: ${w * 0.43}px;

  opacity: 0.4;
`;

export const touchStar = styled.TouchableOpacity`
  padding: 5px;
`;

export const button = styled.TouchableOpacity`
  padding: 8px 25px;

  align-self: center;
  margin-top: 30px;
  border-radius: 5px;

  background-color: ${theme.colors.focus_second};
`;

export const txtButon = styled.Text`
  color: #fff;
  font-family: ${theme.fonts.regular};
`;
