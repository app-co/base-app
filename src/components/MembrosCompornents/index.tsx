/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from 'react';
import { Image, Text } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import theme from '../../global/styles/theme';
import negociosPng from '../../assets/NEGOCIOS.png';

import * as S from './styles';
import { IStars } from '../../dtos';

interface Props {
   userName: string;
   user_avatar: string;
   oficio: string;
   imageOfice: string;
   pres: () => void;
   icon?: 'necociar' | 'indicar' | 'b2b';
   inativo?: boolean;
   inativoPres?: boolean;
   star: number;
}

export function MembrosComponents({
   userName,
   user_avatar,
   oficio,
   imageOfice,
   pres,
   icon,
   inativo,
   inativoPres,
   star = 1,
}: Props) {
   return (
      <S.Container>
         <S.Box
            inativo={inativo}
            onPress={pres}
            disabled={inativoPres}
            style={{
               shadowColor: '#000',
               shadowOffset: {
                  width: 0,
                  height: 3,
               },
               shadowOpacity: 0.27,
               shadowRadius: 4.65,

               elevation: 6,
            }}
         >
            <S.BoxAvatar>
               <S.Avatar
                  source={{
                     uri:
                        user_avatar ||
                        'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png',
                  }}
               />
               <S.ImageOfice source={{ uri: imageOfice }} />
            </S.BoxAvatar>

            <S.BoxText>
               <S.Title>{userName}</S.Title>
               <Text
                  style={{
                     fontFamily: theme.fonts.regular,
                     textAlign: 'left',
                  }}
               >
                  {' '}
                  {oficio}{' '}
               </Text>

               <S.boxH>
                  <S.star name={star >= 1 ? 'star' : 'star-o'} />

                  <S.star name={star >= 2 ? 'star' : 'star-o'} />

                  <S.star name={star >= 3 ? 'star' : 'star-o'} />

                  <S.star name={star >= 4 ? 'star' : 'star-o'} />

                  <S.star name={star >= 5 ? 'star' : 'star-o'} />
               </S.boxH>
            </S.BoxText>

            <S.ContainerIcon>
               {icon === 'necociar' && (
                  <>
                     <Image
                        style={{
                           width: 60,
                           height: 60,
                           marginTop: 10,
                        }}
                        source={negociosPng}
                     />
                  </>
               )}
               {icon === 'indicar' && (
                  <>
                     <AntDesign
                        size={40}
                        name="swap"
                        color={theme.colors.focus}
                     />
                  </>
               )}

               {icon === 'b2b' && (
                  <>
                     <FontAwesome5
                        name="users"
                        size={40}
                        color={theme.colors.focus}
                     />
                  </>
               )}
            </S.ContainerIcon>
         </S.Box>
      </S.Container>
   );
}
