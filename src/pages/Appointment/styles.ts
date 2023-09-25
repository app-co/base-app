import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _hight, _subTitle, _text, _title } from '@/styles/sizes';

interface ISelect {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};
  padding: 0 20px;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  color: ${cor.light['glow-c']};
  font-family: ${font.regular};
  text-align: center;
`;

export const subTitle = styled.Text`
  font-size: ${_subTitle}px;
  color: ${cor.light['glow-c']};
  font-family: ${font.regular};
`;

export const text = styled.Text`
  font-size: ${_text}px;
  color: ${cor.light['glow-c']};
  font-family: ${font.regular};
  text-align: center;
`;

export const content = styled.View`
  width: 100%;

  border-width: 2px;
  border-radius: 10px;

  margin-top: ${_hight * 0.04}px;
  padding: 10px;
`;

export const services = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 5px;
  row-gap: 10px;
`;

export const boxSelectService = styled.TouchableOpacity<ISelect>`
  background-color: ${(h: ISelect) =>
    h.selected ? cor.light['glow-b'] : cor.light.black};
  min-width: 70px;
  padding: 3px 10px;
  border-radius: 8px;
`;

export const boxSelectHours = styled.TouchableOpacity<ISelect>`
  padding: 8px 10px;
  margin: 0 5px;

  background-color: ${(h: ISelect) =>
    h.selected ? cor.light['glow-b'] : cor.light.black};
  border-radius: 8px;
`;

export const boxCalendar = styled.View`
  margin-top: 30px;
`;

export const boxHours = styled.View`
  margin: 20px;
`;

export const input = styled.TextInput`
  border-width: 1px;
  border-radius: 8px;
  height: 34px;
  color: ${cor.light.black};
  font-family: ${font.regular};
  padding-left: 10px;
  background-color: ${cor.light['glow-a']};
`;

export const touch = styled.TouchableOpacity`
  border-radius: 8px;
  margin: 10px 0;
`;
