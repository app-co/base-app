import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

export const Container = styled.View``;

export const Title = styled.Text``;

export const BoxPost = styled.View`
  padding: 10px;
  margin-top: 32px;
  border-radius: ${RFValue(10)}px;
  background-color: ${theme.colors.primary};
  align-self: center;

  border-top-color: ${theme.colors.primary};
  border-right-color: ${theme.colors.primary};
  border-left-color: ${theme.colors.primary};
  border-width: 1px;
`;
export const HeaderPost = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const BoxAvatarPost = styled.View`
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;
  border-radius: 20px;
  background-color: ${theme.colors.tex_light};

  align-items: center;
  justify-content: center;
`;

export const BoxImagePost = styled.View`
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: ${RFValue(8)}px;
`;

export const Avatar = styled.Image`
  height: ${RFValue(45)}px;
  width: ${RFValue(45)}px;
  border-radius: 30px;
`;

export const ImagePost = styled.Image`
  border-radius: 10px;
`;

export const LikePost = styled(BorderlessButton)`
  width: ${RFValue(60)}px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  flex-direction: row;
`;

export const TextPost = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;

export const ViewLike = styled.View`
  flex-direction: row;
  align-items: center;
`;
