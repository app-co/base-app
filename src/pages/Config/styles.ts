import { TextInput, TextInputProps } from 'react-native';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _hight, _subTitle, _text, _title, _width } from '@/styles/sizes';

interface ISelecWeek {
  isSelect: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};
  padding: 20px;
  padding-bottom: 0;
`;

export const title = styled.Text`
  font-family: 'Regular';
  font-size: ${_subTitle}px;
  color: ${cor.light['glow-c']};
`;

export const box = styled.View`
  background-color: rgba(44, 44, 44, 1);
  padding: 10px 20px;
  width: 100%;
  border-radius: 10px;
  min-height: ${_hight * 0.28}px;
  margin: 15px 0;

  justify-content: space-between;
`;

export const input = styled.TextInput<TextInputProps>`
  background-color: ${cor.light['glow-b']};
  font-family: ${font.regular};
  width: 87px;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 10px;
  font-weight: 600;
  color: ${cor.light.black};
`;

export const boxSem = styled.TouchableOpacity`
  width: 65px;
  height: 40px;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background-color: ${cor.light.gray};
`;

export const titleSem = styled.Text<ISelecWeek>`
  font-family: 'Regular';
  font-size: ${_text}px;
  color: ${h => (h.isSelect ? cor.light['glow-c'] : 'rgba(166, 136, 109, .7)')};
`;

export const grid = styled.View`
  width: 100%;
  flex-wrap: wrap;
  max-height: 80px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  /* background-color: red; */
`;

export const box1 = styled.TouchableOpacity<ISelecWeek>`
  background-color: ${h =>
    h.isSelect ? cor.light['glow-b'] : 'rgba(166, 136, 109, .2)'};
  width: ${_width * 0.17}px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 5px 10px;
`;
