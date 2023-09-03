/* eslint-disable react/require-default-props */
import React from 'react';

import * as S from './styles';

interface I {
  selected: boolean;
  title: string;
  pres: () => void;
  variant?: S.TSelect;
}
export function Select({ selected, variant = 'rose', pres, title }: I) {
  return (
    <S.Container onPress={pres}>
      <S.circle variant={variant}>
        <S.dot variant={variant} selected={selected} />
      </S.circle>
      <S.title variant={variant}>{title}</S.title>
    </S.Container>
  );
}
