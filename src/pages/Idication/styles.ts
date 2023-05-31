import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${fonts.BarRegular};
  font-size: ${RFValue(14)}px;
`;

export const Box = styled.View`
  padding: 20px;
`;

export const BoxTextInput = styled.View`
  border-radius: 10px;
  border-width: 1px;
  height: 100px;
  padding: 15px;
`;

export const BoxInput = styled.View`
  border-radius: 10px;
  border-width: 1px;
  padding: 15px;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  font-family: ${fonts.BarLight};
`;

export const Buton = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(40)}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.focus};
  margin-top: 20px;
`;

export const TextBoton = styled.Text`
  font-family: ${fonts.BarRegular};
  font-size: ${RFValue(14)}px;
  color: ${colors.primary};
`;
