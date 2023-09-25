import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subTitle, _text, _title } from '@/styles/sizes';

const h = Dimensions.get('screen').height;

interface IProps {
  next: boolean;
}

export const Container = styled.View<IProps>`
  background-color: ${h =>
    h.next ? cor.light['glow-b'] : cor.light['glow-c']};

  height: ${h * 0.16}px;
  width: 95%;

  padding: 15px;
  border-radius: 36px;

  position: absolute;
  top: 20px;
`;

export const shadow = styled.View`
  position: relative;
  background-color: ${cor.light.black_b};
  height: ${h * 0.16}px;
  width: 95%;
  z-index: 0;

  top: ${h * 0.035}px;
  left: 8px;
  border-radius: 35px;
`;

export const boxHour = styled.View`
  /* flex: 1; */
  position: relative;
  border-radius: 80px;
  top: -${h * 0.045}px;
`;

export const header = styled.View`
  width: 85%;
  position: fixed;
  top: 28px;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 20px;
  align-self: flex-end;
`;

export const content = styled.View`
  flex: 1;
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: 'Bold';
  text-align: right;
  line-height: 20px;
  /* margin-left: 50px; */
`;
export const text = styled.Text`
  font-family: 'Regular';
  font-size: ${_text + 5}px;
  color: ${cor.light['glow-a']};
`;

export const textHour = styled.Text`
  position: absolute;
  font-family: ${font.bold};
  font-weight: 600;
  font-size: ${_subTitle + 5}px;
  color: ${cor.light['glow-c']};
  z-index: 999;
  top: 6%;
  left: 9%;
`;

export const flex = styled.View`
  flex-direction: row;
  width: 100%;
`;
