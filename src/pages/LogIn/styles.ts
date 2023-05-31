import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${theme.colors.focus};
  align-items: center;
  /* padding-bottom: 10px; */
`;

export const BoxLogo = styled.View`
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: center;
`;

export const BoxInput = styled.View`
  padding: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${theme.fonts.blac};
  color: ${theme.colors.primary};
  margin-left: 10px;
`;

const wid = 180;
const hei = wid - 70;
export const Logo = styled.Image`
  width: ${RFValue(wid)}px;
  height: ${RFValue(hei)}px;
  margin-top: ${RFValue(50)}px;
`;
