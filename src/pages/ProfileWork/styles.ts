import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subTitle, _text, _title } from '@/styles/sizes';

export const Container = styled.View`
  padding: 0 20px;
  background-color: ${cor.light.gray};

  flex: 1;
`;

export const content = styled.View`
  border-width: 2px;
  border-color: ${cor.light.black};
  padding: 10px;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: ${cor.light.black_b};

  margin-top: 10px;
`;

export const title = styled.Text`
  color: ${cor.light['glow-c']};
  font-family: ${font.regular};
  font-size: ${_subTitle}px;
`;

export const subTitle = styled.Text`
  color: ${cor.light['glow-a']};
  font-family: ${font.regular};
  font-size: ${_text}px;
`;

export const text = styled.Text`
  color: ${cor.light['glow-a']};
  font-family: ${font.light};
  font-size: ${_text}px;
`;

export const boxSem = styled.View`
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const touch = styled.TouchableOpacity`
  padding: 3px 5px;
  margin-left: 10px;
`;
