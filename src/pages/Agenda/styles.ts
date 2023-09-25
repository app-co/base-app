import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};
`;

export const title = styled.Text`
  color: ${cor.light['glow-c']};
  font-size: ${_title + 2}px;
  font-family: 'Bold';
`;
