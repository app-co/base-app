import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _hight, _subTitle } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};
  padding: 20px;
  padding-top: 0;
`;

export const toch = styled.TouchableOpacity`
  padding: 5px 10px;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  font-size: ${_subTitle}px;
  color: ${cor.light['glow-c']};
`;

export const input = styled.TextInput`
  height: ${_hight * 0.03}px;
  font-family: ${font.regular};
  color: ${cor.light['glow-c']};
`;

export const subTitle = styled.Text`
  font-family: ${font.light};
  font-size: ${_subTitle}px;
  color: ${cor.light['glow-a']};
`;
