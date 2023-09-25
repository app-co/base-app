import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

import { useFonts } from 'expo-font';

import { Mitr_400Regular as Regular } from '@expo-google-fonts/mitr';

import { format } from 'date-fns';

import { IAppointment } from '@/dtos';
import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';
import { Canvas, Oval, useFont } from '@shopify/react-native-skia';

import * as S from './styles';

const h = Dimensions.get('screen').height;

interface IProps {
  item: IAppointment;
  next: boolean;
}

export function Card({ item, next = false }: IProps) {
  const date = item?.start ? format(new Date(item.start), 'HH:mm') : '00:00';

  console.log(item);

  return (
    <View>
      <S.shadow />
      <S.Container next={next}>
        <S.header>
          <S.title>{item?.service}</S.title>
        </S.header>

        <S.content>
          <S.flex>
            <S.text>Cliente: </S.text>
            <S.text>{item?.client_name}</S.text>
          </S.flex>
        </S.content>
      </S.Container>

      <S.textHour>{date}</S.textHour>
      <Canvas
        style={{
          width: 130,
          height: 66,
          position: 'relative',
          top: -(h * 0.165),
        }}
      >
        <Oval x={0} y={0} width={130} height={66} color={cor.light.black_b} />
      </Canvas>
    </View>
  );
}
