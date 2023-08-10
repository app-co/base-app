import React from 'react';

import * as S from './styles';

export function Home() {
  return (
    <S.Container>
      <S.title>Home</S.title>
      <S.subTitle>Home</S.subTitle>
      <S.text>Home</S.text>
      <S.title>{process.env.HOME_BASE}</S.title>
    </S.Container>
  );
}
