import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _text } from '@/styles/sizes';

export const Container = styled.View`
  margin-bottom: 5px;
`;

export const title = styled.Text`
  font-size: ${_text + 1}px;
  color: ${cor.light['glow-c']};
`;

export const line = styled.View`
  height: 1.8px;
  width: 100%;

  background-color: ${cor.light.black};
`;
