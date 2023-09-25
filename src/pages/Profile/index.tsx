import React from 'react';
import { useForm } from 'react-hook-form';

import { Image } from 'expo-image';

import { Box, Center, HStack, ScrollView, VStack } from 'native-base';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { InputForm } from '@/components/InputForm';
import { Menu } from '@/components/Menu';
import { useAuth } from '@/hooks/useAuth';
import { cor } from '@/styles/cor';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form } from './form';
import { schemeProfile } from './scheme';
import * as S from './styles';

interface IDataForm {
  name?: string;
  email?: string;
  cell?: string;
  cnpj?: string;
  cpf?: string;

  locality?: string;
  city?: string;
  home_number?: string;
  region_code?: string;

  postal_code?: string;
  razao_social?: string;
}

export function Profile() {
  const { provider } = useAuth();
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<IDataForm>(schemeProfile),
    defaultValues: provider,
  });

  const submit = React.useCallback(async (data: IDataForm) => {
    console.log(data);
  }, []);

  return (
    <S.Container>
      <Menu title="Perfil proficional" />

      <ScrollView mt="8" contentContainerStyle={{ paddingBottom: 50 }}>
        <VStack space={2} p="4">
          <Form
            name="name"
            label="Seu nome"
            control={control}
            error={errors.name}
          />

          <Form
            name="email"
            label="E-mail"
            control={control}
            error={errors.email}
          />
          <Form
            name="cell"
            label="Contato"
            control={control}
            error={errors.cell}
          />
          <Form
            name="cnpj"
            label="CNPJ"
            control={control}
            error={errors.cnpj}
          />
          <Form name="cpf" label="CPF" control={control} error={errors.cpf} />

          <S.title style={{ marginTop: 20 }}>Endereço Comercial</S.title>
          <Form
            name="locality"
            label="Endereço"
            control={control}
            error={errors.locality}
          />
          <Form
            name="city"
            label="Cidade"
            control={control}
            error={errors.city}
          />
          <Form
            name="home_number"
            label="Nº estabelecimento"
            control={control}
            error={errors.home_number}
          />
          <Form
            name="region_code"
            label="UF"
            control={control}
            error={errors.region_code}
          />

          <Form
            name="postal_code"
            label="CEP"
            control={control}
            error={errors.postal_code}
          />
          <Form
            name="razao_social"
            label="Razão social"
            control={control}
            error={errors.razao_social}
          />
        </VStack>

        <Center>
          <HStack>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: 'https://media1.thehungryjpeg.com/thumbs/800_3544573_xgu6m02sehxt0j5pcm2wgb3hfcwppica6xq29nq7.jpg',
              }}
            />

            <S.toch>
              <S.subTitle>Alterar logo</S.subTitle>
            </S.toch>
          </HStack>
        </Center>
      </ScrollView>
      <Button title="SALVAR" />
    </S.Container>
  );
}
