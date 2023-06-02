import { FontAwesome } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { w } from '../../utils/size';

const { colors, fonts } = theme;
export const Container = styled.View`
  background-color: ${colors.secundary};
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: ${RFValue(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${fonts.regular};
  color: ${colors.focus};
`;

export const TitleName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${fonts.bold};
  color: ${colors.focus};
`;

export const Avatar = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
  background-color: ${colors.focus};
`;

export const MapView = styled.TouchableOpacity`
  width: ${w * 0.3}px;
  min-height: ${RFPercentage(5)}px;
  background-color: ${colors.focus};
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(15)}px;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const boxH = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: ${w * 0.3}px;

  align-self: center;
`;

export const star = styled(FontAwesome)`
  color: ${theme.colors.focus_second};
  font-size: ${RFValue(18)}px;
`;

export const boxV = styled.View``;

export const TitleMaps = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${fonts.regular};
  color: ${colors.text_secundary};
  margin-left: 5px;
`;

export const Box = styled.TouchableOpacity`
  width: ${RFPercentage(10.5)}px;
  height: ${RFPercentage(6)}px;
  background-color: ${colors.focus_light};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 8px;
`;

export const TitleSocial = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${fonts.regular};
  color: ${colors.text_secundary};
`;
