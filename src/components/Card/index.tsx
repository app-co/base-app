import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

import { Mitr_400Regular as Regular } from '@expo-google-fonts/mitr';

import { useFonts } from 'expo-font';

import { Canvas, Oval, useFont } from '@shopify/react-native-skia';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

import * as S from './styles';

const h = Dimensions.get('screen').height;

interface IProps {
  work: string;
  date: string;
  name: string;
  next: boolean;
}

export function Card({ work, next = false, date = '00:00', name }: IProps) {
  const [fontsLoaded] = useFonts({
    Regular,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      <S.shadow />
      <S.Container next={next}>
        <S.header>
          <S.title>{work}</S.title>
        </S.header>

        <S.content>
          <S.flex>
            <S.text>Cliente: </S.text>
            <S.text>{name}</S.text>
          </S.flex>
        </S.content>
      </S.Container>

      <S.textHour>{date}</S.textHour>
      <Canvas
        style={{
          width: 130,
          height: 66,
          position: 'relative',
          top: -(h * 0.16),
        }}
      >
        <Oval x={0} y={0} width={130} height={66} color={cor.light.gray} />
        {/* <Text
          font={font!}
          text={date}
          y={40}
          x={24}
          color={cor.light['glow-c']}
        /> */}
      </Canvas>
    </View>
  );
}
