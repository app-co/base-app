import styled from 'styled-components/native';

import theme from '../../../global/styles/theme';
import { _text } from '../../../utils/size';

export const Container = styled.View`
  flex: 1;
`;

export const title = styled.Text`
  color: #fff;
  font-weight: 600;
  font-family: ${theme.fonts.bold};

  font-size: ${_text + 4}px;
`;

export const text = styled.Text`
  color: #fff;
  font-weight: 600;
  font-family: ${theme.fonts.bold};

  font-size: ${_text}px;
`;

export const approvedButon = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: ${theme.colors.focus};
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 6px;
`;

export const reprovedButon = styled.TouchableOpacity`
  padding: 5px 10px;
  height: 40px;
  border-radius: 6px;
  background-color: ${theme.colors.focus_second};
  align-items: center;
  justify-content: center;
`;
