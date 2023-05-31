import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({ theme: h }) => h.colors.primary};
    flex: 1;
`;

export const BoxImage = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-family: ${({ theme: h }) => h.fonts.blac};
    font-size: ${RFValue(16)}px;
    bottom: ${RFValue(50)}px;
    color: ${({ theme: h }) => h.colors.text};
    left: ${RFValue(10)}px;
`;

export const Image = styled.Image`
    opacity: 0.7;
`;
