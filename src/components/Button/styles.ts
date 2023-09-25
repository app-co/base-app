import { Dimensions, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _title } from '@/styles/sizes';

const h = Dimensions.get('screen').height;

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${h * 0.05}px;

  background-color: ${cor.light.gray};

  align-items: center;
  justify-content: center;
  border-radius: 8px;

  margin-top: 10px;
`;

export const title = styled.Text`
  font-size: ${_title + 1}px;
  font-family: ${font.regular};
  color: ${cor.light['glow-c']};
`;
