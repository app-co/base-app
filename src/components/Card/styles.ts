import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

import { cor } from '@/styles/cor';
import { _text, _title } from '@/styles/sizes';

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
  background-color: rgba(14, 14, 14, 0.568);
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
  background-color: red;
  border-radius: 80px;
  top: -${h * 0.045}px;
`;

export const header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const content = styled.View`
  flex: 1;
`;

export const title = styled.Text`
  font-size: ${_title + 5}px;
  /* font-family: 'Bold'; */
  text-align: center;
`;
export const text = styled.Text`
  font-family: 'Regular';
  font-weight: 600;
  font-size: ${_text + 5}px;
  color: ${cor.light['glow-c']};
`;

export const textHour = styled.Text`
  position: absolute;
  font-family: 'Regular';
  font-weight: 600;
  font-size: ${_text + 5}px;
  color: ${cor.light['glow-c']};
  z-index: 999;
  top: 6%;
  left: 9%;
`;

export const flex = styled.View`
  flex-direction: row;
  width: 100%;
`;
