import styled from 'styled-components/native';

import { cor } from '@/styles/cor';

export const Container = styled.View`
  width: 100%;
  align-items: center;

  background-color: ${cor.light['glow-b']};
  padding: 20px;

  border-radius: 10px;
  margin: 5px 0;
`;

export const title = styled.Text`
  margin-left: 10px;
  color: ${cor.light.black};
  font-weight: 600;
`;

export const del = styled.Text`
  margin-left: 10px;
  color: #830c0c;
  font-weight: 600;
`;

export const agenda = styled.Text`
  margin-left: 10px;
  color: ${cor.light['glow-a']};
  font-weight: 600;
`;

export const agendar = styled.Text`
  margin-left: 10px;
  color: ${cor.light['glow-c']};
  font-weight: 600;
`;

export const touch = styled.TouchableOpacity`
  padding: 5px 10px;
`;
