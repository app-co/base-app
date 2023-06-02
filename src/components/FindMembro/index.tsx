import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  Zocial,
} from '@expo/vector-icons';
import { HStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/theme';
import * as S from './styles';

interface Props {
  name: string;
  workName: string;
  face: () => void;
  insta: () => void;
  whats: () => void;
  maps: () => void;
  avatar: string;
  star: number;
}

export function FindMembroComponent({
  name,
  workName,
  face,
  insta,
  whats,
  maps,
  avatar,
  star = 1,
}: Props) {
  return (
    <S.Container>
      <View style={{ flexDirection: 'row' }}>
        <S.Avatar
          source={{
            uri:
              avatar ||
              'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png',
          }}
        />
        <View style={{ marginLeft: RFValue(10) }}>
          <S.TitleName>{name} </S.TitleName>
          <S.Title>{workName}</S.Title>

          <S.boxH>
            <S.star name={star >= 1 ? 'star' : 'star-o'} />

            <S.star name={star >= 2 ? 'star' : 'star-o'} />

            <S.star name={star >= 3 ? 'star' : 'star-o'} />

            <S.star name={star >= 4 ? 'star' : 'star-o'} />

            <S.star name={star >= 5 ? 'star' : 'star-o'} />
          </S.boxH>
        </View>
      </View>

      <S.MapView onPress={maps}>
        <Feather
          name="map-pin"
          color={theme.colors.primary}
          size={RFValue(20)}
        />
        <S.TitleMaps>endereço</S.TitleMaps>
      </S.MapView>

      <S.Title>Midias sociais</S.Title>

      <HStack space={3} alignSelf="center">
        <S.Box onPress={whats}>
          <FontAwesome name="whatsapp" color="#6fff4b" size={RFValue(16)} />
          <S.TitleSocial>Whatts</S.TitleSocial>
        </S.Box>

        <S.Box onPress={face}>
          <Zocial name="facebook" color="#6bc4ff" size={RFValue(16)} />

          <S.TitleSocial>Face </S.TitleSocial>
        </S.Box>

        <S.Box onPress={insta}>
          <Zocial name="instagram" color="#a952e4" size={RFValue(16)} />

          <S.TitleSocial>Insta</S.TitleSocial>
        </S.Box>

        <S.Box onPress={insta}>
          <MaterialCommunityIcons
            name="web"
            color={theme.colors.primary}
            size={RFValue(16)}
          />

          <S.TitleSocial style={{ textAlign: 'center' }}>WEB</S.TitleSocial>
        </S.Box>
      </HStack>
    </S.Container>
  );
}
