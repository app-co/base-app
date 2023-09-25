/* eslint-disable react/require-default-props */
import { Control, FieldError, FieldName } from 'react-hook-form';

import { VStack } from 'native-base';

import { InputForm } from '@/components/InputForm';
import { cor } from '@/styles/cor';

import * as S from './styles';

interface I {
  name: string;
  label: string;
  error?: FieldError;
  control: Control;
}

export function Form({ name, label, control, error }: I) {
  return (
    <VStack>
      <S.subTitle>{label}</S.subTitle>
      <InputForm
        icon="clock"
        name={name}
        error={error}
        control={control}
        render={({ onChange, value }) => (
          <S.input
            placeholderTextColor={cor.light['glow-c']}
            placeholder="Nome"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </VStack>
  );
}
