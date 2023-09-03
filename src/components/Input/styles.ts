import { css } from 'styled-components';
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _hight, _width } from '@/styles/sizes';

interface I {
  filed: boolean;
  focus: boolean;
  error: boolean;
}

export type TCondition = 'filed' | 'focus' | 'error';

const condition = {
  filed: cor.light['glow-a'],
  focus: cor.light['glow-b'][3],
  error: cor.light.black[3],
};

export const Container = styled.View<I>`
  min-width: ${_width * 0.8}px;
  height: ${_hight * 0.05}px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  background-color: ${cor.light['glow-c']};

  border-width: 1px;

  ${(h: I) =>
    h.filed &&
    css`
      border-color: ${cor.light.black};
      border-width: 2px;
    `}

  ${(h: I) =>
    h.focus &&
    css`
      border-color: ${cor.light.black};
      border-width: 2px;
    `}
`;

export const title = styled.Text``;

export const input = styled.TextInput`
  flex: 1;
  padding: 0 0 0 10px;
  font-family: ${font.bold};
`;

export const boxIcon = styled.View`
  width: 40px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
