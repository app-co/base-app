import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

import theme from '../../global/styles/theme';

interface Props {
  isError: boolean;
  isFocus: boolean;
}
export const Box = styled.View<Props>`
  padding: 2px 10px;
  background-color: #7e7e7e;

  width: ${RFValue(270)}px;
  height: ${RFValue(40)}px;
  border-width: 2px;
  justify-content: center;
  margin-bottom: 30px;
  flex-direction: row;
  border-radius: ${RFValue(10)}px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${theme.colors.focus};

  ${({ theme, isError }) =>
    isError &&
    css`
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: #dba838;
      border-width: 2px;
    `}

  ${({ theme, isFocus }) =>
    isFocus &&
    css`
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: #dba838;
      border-width: 2px;
    `}
`;

export const Container = styled(TextInput)`
  flex: 1;
  /* font-family: ${theme.fonts.bold}; */
  font-size: ${RFValue(16)}px;
  color: #fff;
`;

export const Icon = styled(Feather)`
  margin-right: 14px;
  align-self: center;
`;
