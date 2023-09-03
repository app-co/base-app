/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { cor } from '@/styles/cor';

import * as S from './styles';

export interface TypeInput extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ value, icon, ...rest }: TypeInput) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFiled, setIsFiled] = React.useState(false);

  const handleFocus = React.useCallback(async () => {
    setIsFocused(true);
  }, []);

  const handleBlur = React.useCallback(async () => {
    setIsFocused(false);
    setIsFiled(!!value);
  }, [value]);

  return (
    <S.Container focus={isFocused} filed={isFiled} error>
      <S.input
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
      />
      <S.boxIcon>
        <Feather
          name={icon}
          size={25}
          color={isFiled || isFocused ? cor.light.black : cor.light['glow-b']}
        />
      </S.boxIcon>
    </S.Container>
  );
}
