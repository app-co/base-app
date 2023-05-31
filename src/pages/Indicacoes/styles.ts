import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

const { colors, fonts } = theme;

export const Container = styled.View``;

export const Title = styled.Text`
   font-size: 24px;
   font-family: ${fonts.BarRegular};
`;

export const TitleInput = styled.Text`
   font-size: 26px;
   font-family: ${fonts.BarLight};
`;

export const TextButon = styled.Text`
   font-size: 26px;
   font-family: ${fonts.BarRegular};
   color: ${colors.primary};
`;

export const BoxModal = styled.View`
   height: ${RFValue(600)}px;
   padding: 20px;
   margin-top: ${RFValue(10)}px;
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
   height: 50px;
   padding: 15px;
   margin-top: 10px;
`;

export const Input = styled.TextInput`
   font-size: 18px;
   font-family: ${fonts.BarLight};
`;

export const BoxButton = styled.TouchableOpacity`
   background-color: ${colors.focus_light};
   width: 100%;
   height: 48px;
   margin-top: 10px;
   align-items: center;
   justify-content: center;
   border-radius: 10px;
`;
