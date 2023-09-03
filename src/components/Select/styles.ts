/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _subTitle } from '@/styles/sizes';

export type TSelect = 'gray' | 'rose';

interface I {
  selected?: boolean;
  variant?: TSelect;
}

const variant = {
  gray: cor.light.gray,
  rose: cor.light['glow-c'],
};

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const title = styled.Text<I>`
  margin-left: 5px;
  font-size: ${_subTitle}px;
  color: ${h => variant[h.variant!]};
  /* font-family: 'Bold'; */
`;

export const circle = styled.View<I>`
  width: 23px;
  height: 23px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;

  background-color: ${h => variant[h.variant!]};
`;

export const dot = styled.View<I>`
  width: 15px;
  height: 15px;
  border-radius: 90px;
  background-color: ${h =>
    h.selected && h.variant === 'gray' ? cor.light.gray : cor.light['glow-c']};
`;
