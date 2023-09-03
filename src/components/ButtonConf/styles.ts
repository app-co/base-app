import styled from 'styled-components/native';

import { Dimensions, TouchableOpacity } from 'react-native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

const h = Dimensions.get('screen').height;

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${h * 0.05}px;

  background-color: ${cor.light.gray};

  align-items: center;
  justify-content: center;
  border-radius: 10px;

  margin-top: 40px;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  /* font-family: 'Regular'; */
  color: ${cor.light['glow-c']};
`;
