import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;
export const Container = styled.View``;

export const Title = styled.Text`
    font-family: ${fonts.blac};
    font-size: 20px;
    color: ${colors.text};
`;

export const Box = styled.View`
    background-color: ${colors.primary};
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: center;
`;

export const ButtonValidar = styled.TouchableOpacity`
    width: 70%;
    height: 40px;
    background-color: ${colors.focus};
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-top: 25px;
`;

export const TextButtonValidar = styled.Text`
    font-family: ${fonts.blac};
    font-size: 20px;
    color: ${colors.text_secundary};
`;
