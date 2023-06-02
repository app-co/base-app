import styled from 'styled-components/native';

import { _height, _subTitle, _text } from '../../utils/size';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  background-color: rgba(24, 37, 82, 0.589);
  padding: 10px 5px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  color: #fff;
`;

export const text = styled.Text`
  color: #fff;
  font-size: ${_text};
`;

export const line = styled.View`
  width: 100%;
  background-color: ${theme.colors.focus_second_light};
`;

export const confirm = styled.TouchableOpacity`
  background-color: ${theme.colors.focus};
  border-radius: 8px;
  height: 30px;
  padding: 2px 10px;
  align-items: center;
  justify-content: center;
`;

export const recusar = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${theme.colors.secundary};
  height: 30px;
  padding: 2px 10px;

  align-items: center;
  justify-content: center;
`;

export const buttonText = styled.Text`
  font-family: ${theme.fonts.bold};
  color: #fff;
`;
