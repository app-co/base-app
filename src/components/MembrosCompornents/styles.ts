import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { w } from '../../utils/size';

type Props = {
  inativo: boolean;
};

export const Container = styled.View``;

export const BoxText = styled.View`
  flex: 1;
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

export const Title = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${RFValue(22)}px;
`;

export const Box = styled.TouchableOpacity<Props>`
  flex-direction: row;
  padding: 20px;
  background-color: ${h =>
    h.inativo ? theme.colors.focus_second_light : theme.colors.primary};
  margin-bottom: 10px;
`;

export const Linha = styled.View``;

export const BoxAvatar = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: ${RFValue(110)}px;
  height: ${RFValue(100)}px;
  border-radius: 16px;
  background-color: ${theme.colors.focus};
`;

export const ImageOfice = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
  top: ${RFValue(50)}px;
  right: ${RFValue(25)}px;
  background-color: ${theme.colors.tex_light};
`;

export const ContainerIcon = styled.View`
  flex: 0.4;
`;
