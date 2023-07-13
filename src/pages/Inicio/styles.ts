import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { _subTitle, _text, _title } from '../../utils/size';

const { colors, fonts } = theme;
const { height, width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
  padding: ${width / 10.5}px 5px;
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 20}px;
  justify-content: space-between;
`;

export const title = styled.Text`
  font-family: ${fonts.Regular};
  font-size: ${_title}px;
  /* color: ${colors.text_secundary}; */
`;

export const subTitle = styled.Text`
  font-family: ${fonts.medium};
  font-size: ${_subTitle}px;
  /* color: ${colors.text_secundary}; */
`;

export const text = styled.Text`
  font-family: ${fonts.Regular};
  font-size: ${_text}px;
  /* color: ${colors.text_secundary}; */
`;

export const Box = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;

  width: 100%;
  height: ${width * 0.12}px;
  align-items: center;
  /* background-color: red; */
  margin-bottom: ${RFPercentage(0.1)}px;
`;

export const Avatar = styled.Image`
  width: ${RFValue(130)}px;
  height: ${RFValue(130)}px;
  border-radius: ${RFValue(75)}px;
  align-self: center;
`;

export const BoxIco = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.focus_light};
  width: ${height * 0.15}px;
  height: ${height * 0.15}px;
  border-radius: ${RFValue(100)}px;
  align-self: center;
`;

export const TitleName = styled.Text`
  /* margin-top: 10px; */
  font-family: ${fonts.Regular};
  font-size: ${RFValue(20)}px;
  align-self: center;
  color: ${theme.colors.text};
`;

export const BoxPrice = styled.View.attrs({
  shadowColor: colors.focus,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
})`
  width: ${width * 0.5}px;
  background-color: ${theme.colors.focus};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(15)}px;
  margin-bottom: ${RFValue(15)}px;
  padding: 2px;
`;
export const TitlePrice = styled.Text`
  font-family: ${fonts.Regular};
  font-size: ${RFValue(16)}px;
  color: ${theme.colors.text_secundary};
`;

export const TitleP = styled.Text`
  font-family: ${fonts.Regular};
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.text_secundary};
`;

export const ComprasText = styled.Text`
  font-family: ${fonts.Regular};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.text};
  top: ${RFValue(15)}px;
`;

export const Scroll = styled.ScrollView`
  padding: 20px 0;
`;

export const Line = styled.View.attrs({
  shadowColor: colors.focus,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
})`
  height: 2px;
  width: 80%;
  background-color: ${colors.text};
  align-self: center;
  margin-top: ${width / 29}px;
  margin-bottom: ${width / 20}px;
`;

export const IConSimple = styled(SimpleLineIcons)`
  font-size: ${width / 16}px;
`;

export const IconIoncic = styled(Ionicons)`
  font-size: ${width / 16}px;
`;

export const IconAnt = styled(AntDesign)`
  font-size: ${width / 16}px;
`;

export const IconFont = styled(FontAwesome5)`
  font-size: ${width / 16}px;
`;

export const IconFoundation = styled(Foundation)`
  font-size: ${width / 16}px;
`;

export const FontAwes = styled(FontAwesome)`
  font-size: ${width / 16}px;
`;
