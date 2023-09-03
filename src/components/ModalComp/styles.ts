import styled from 'styled-components/native';

import { Modal } from 'react-native';

import { cor } from '@/styles/cor';

export const modal = styled(Modal)`
  flex: 1;
  background-color: #555050;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #292828d3;
  justify-content: center;
`;

export const content = styled.View`
  width: 100%;

  align-items: center;
  justify-content: space-evenly;

  background-color: ${cor.light['glow-c']};

  padding: 20px;
`;

export const header = styled.View`
  width: 100%;
  padding: 0 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const closed = styled.TouchableOpacity`
  padding: 10px;
  align-self: flex-end;
`;

export const title = styled.Text``;
