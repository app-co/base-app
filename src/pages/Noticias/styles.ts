import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const BoxImage = styled(RectButton)``;

export const Title = styled.Text`
    font-family: ${({ theme: h }) => h.fonts.blac};
    font-size: ${RFValue(24)}px;
    color: ${({ theme: h }) => h.colors.text};
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme: h }) => h.fonts.tenor};
    font-size: ${RFValue(16)}px;
    color: ${({ theme: h }) => h.colors.text};
`;

export const Image = styled.Image``;

export const BoxNoticia = styled.View`
    padding: 20px;
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(70)}px;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ theme: h }) => h.colors.secundary};
    align-items: center;
    padding: 0 20px;
`;

export const BoxAvatar = styled.TouchableOpacity`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    border-radius: ${RFValue(30)}px;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme: h }) => h.colors.primary};
`;

export const Avatar = styled.Image``;

export const Titl = styled.Text`
    font-family: ${({ theme: h }) => h.fonts.blac};
    color: ${({ theme: h }) => h.colors.text_secundary};
    margin-left: ${RFValue(70)}px;
    font-size: ${RFValue(24)}px;
`;
