import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _title } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};

  padding: 0 25px;
`;

export const title = styled.Text`
  align-self: center;
  font-size: ${_title}px;
  margin-bottom: 20px;
  font-family: ${font.regular};
  text-align: center;
  color: ${cor.light['glow-c']};
  margin-top: 20px;
`;
