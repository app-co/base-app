import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _hight, _subTitle, _text, _title } from '@/styles/sizes';

export const Container = styled.View`
  padding: 0 20px;

  flex: 1;
  background-color: ${cor.light.gray};
`;

export const title = styled.Text`
  color: ${cor.light['glow-c']};

  font-size: ${_title}px;
  font-family: ${font.bold};

  text-align: center;
`;

export const text = styled.Text`
  color: ${cor.light['glow-c']};

  font-size: ${_text}px;
  font-family: ${font.light};
`;

export const sutitle = styled.Text`
  color: ${cor.light['glow-a']};

  font-size: ${_subTitle}px;
  font-family: ${font.regular};
`;

export const content = styled.View`
  border-radius: 10px;
  background-color: ${cor.light.black_b};
  border-width: 2px;
  border-color: ${cor.light.black};

  margin-top: 20px;
  padding: 10px;
`;

export const chartBox = styled.View`
  border-width: 2px;
  border-color: ${cor.light.black};
  height: ${_hight * 0.2}px;
  /* background-color: ${cor.light.black_b}; */
  border-radius: 10px;
  margin-top: 2px;
  align-items: center;
  justify-content: center;
`;
