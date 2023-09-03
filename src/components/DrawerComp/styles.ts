import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

const h = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;

  background-color: ${cor.light['glow-b']};
  justify-content: space-between;
`;

export const title = styled.Text`
  font-size: ${_title + 5}px;
  /* font-family: 'Bold'; */
`;

export const header = styled.View`
  margin: ${h * 0.09}px;
`;

export const text = styled.Text``;

export const flex = styled.View`
  flex-direction: row;
`;

export const logOf = styled.View`
  align-self: baseline;
  width: 100%;
`;
