import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import * as y from 'yup';

import Logo from '@/assets/LOGO.png';
import { FormInput } from '@/components/FormInput';

import { useAuth } from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Button';
import { ModalComp } from '../../components/ModalComp';
import * as S from './styles';

type TFormaData = {
  email: string;
  password: string;
};

const scheme = y.object({
  email: y.string().email('E-mail inválido').required('Informe seu email'),
  password: y.string().required('Informe sua senha'),
});

export function Login() {
  const { login } = useAuth();
  const [shoModal, setShowModal] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormaData>({
    resolver: yupResolver(scheme),
  });

  const submit = React.useCallback(async (data: TFormaData) => {
    login(data);
  }, []);

  return (
    <S.Container>
      <ModalComp
        showModal={shoModal}
        closed={() => setShowModal(false)}
        title="Esqueceu sua senha?"
        component={
          <View style={{ marginTop: 20 }}>
            <S.text>Entre com seu email para recuperar</S.text>

            <FormInput
              error={errors.email}
              name="email"
              control={control}
              icon="mail"
            />

            <Button />
          </View>
        }
      />

      <S.img source={Logo} />

      <S.boxForm>
        <FormInput
          error={errors.email}
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
          control={control}
          icon="mail"
          placeholder="Seu email"
        />

        <FormInput
          error={errors.password}
          name="password"
          control={control}
          icon="lock"
          placeholder="Sua senha"
        />
        <S.forgotPass onPress={() => setShowModal(true)}>
          <S.text>Esqueci minha senha</S.text>
        </S.forgotPass>
      </S.boxForm>
      <Button load={false} onPress={handleSubmit(submit)} />

      <S.foot>
        <S.title>NÃO TENHO CONTA</S.title>
      </S.foot>
    </S.Container>
  );
}
