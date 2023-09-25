import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subTitle, _text, _title } from '@/styles/sizes';

export const Container = styled.View`
  margin-bottom: 5px;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  color: ${cor.light['glow-c']};
  font-family: ${font.bold};
`;

export const subTitle = styled.Text`
  font-size: ${_subTitle}px;
  color: ${cor.light['glow-c']};
  font-family: ${font.regular};
`;

export const text = styled.Text`
  font-size: ${_text}px;
  color: ${cor.light['glow-b']};
  font-family: ${font.regular};
`;

export const line = styled.View`
  height: 1.8px;
  width: 100%;

  background-color: ${cor.light.black};
`;
