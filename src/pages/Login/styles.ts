import { Dimensions } from 'react-native';

import { Image } from 'expo-image';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subTitle, _text, _title } from '@/styles/sizes';

const h = Dimensions.get('screen').height;
const w = Dimensions.get('screen').width;

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light['glow-a']};

  align-items: center;

  padding: 20px;

  justify-content: space-between;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  /* font-family: 'Regular'; */
`;

export const img = styled(Image)`
  width: ${h * 0.4}px;
  height: ${h * 0.17}px;

  margin-top: ${h * 0.1}px;
`;

export const foot = styled.View`
  background-color: ${cor.light['glow-b']};
  height: ${h * 0.08}px;
  width: ${w}px;
  top: 20px;

  align-items: center;
  justify-content: center;
`;

export const forgotPass = styled.TouchableOpacity`
  padding: 5px 10px;
`;

export const text = styled.Text`
  font-size: ${_text}px;

  font-family: ${font.regular};
  margin-top: 16px;
`;

export const boxForm = styled.View`
  gap: 10px;
`;
