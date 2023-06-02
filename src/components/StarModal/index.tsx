/* eslint-disable react/require-default-props */
import React from 'react';

import logo from '../../assets/logo.png';
import * as S from './styles';

interface Props {
  submit: () => void;
  setStars: (star: number) => void;
  star: number;
  prestador?: string;
}

export function StarModal({ submit, prestador, setStars, star = 0 }: Props) {
  return (
    <S.Container>
      <S.logo source={logo} />

      <S.title>Como foi sua experiência com {prestador}?</S.title>
      <S.boxH>
        <S.touchStar onPress={() => setStars(1)}>
          <S.star name={star >= 1 ? 'star' : 'star-o'} />
        </S.touchStar>

        <S.touchStar onPress={() => setStars(2)}>
          <S.star name={star >= 2 ? 'star' : 'star-o'} />
        </S.touchStar>

        <S.touchStar onPress={() => setStars(3)}>
          <S.star name={star >= 3 ? 'star' : 'star-o'} />
        </S.touchStar>

        <S.touchStar onPress={() => setStars(4)}>
          <S.star name={star >= 4 ? 'star' : 'star-o'} />
        </S.touchStar>

        <S.touchStar onPress={() => setStars(5)}>
          <S.star name={star >= 5 ? 'star' : 'star-o'} />
        </S.touchStar>
      </S.boxH>

      <S.button onPress={submit}>
        <S.txtButon>SALVAR</S.txtButon>
      </S.button>
    </S.Container>
  );
}
