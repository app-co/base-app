/* eslint-disable react/jsx-props-no-spreading */
import {
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { Button } from '../Button';
import * as S from './styles';

type Props = DrawerContentComponentProps;

export function DrawerContent({ ...props }: Props) {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <S.Container>
      <S.header>
        <S.flex>
          <Image placeholder={blurhash} />

          <S.title>william</S.title>
        </S.flex>
      </S.header>

      <ScrollView>
        <DrawerItemList {...props} />
      </ScrollView>

      <S.logOf>
        <Button load={false} title="SAIR" />
      </S.logOf>
    </S.Container>
  );
}
