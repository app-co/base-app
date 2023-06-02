import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface Props {
   focus: boolean
}

export const Container = styled.View<Props>`
   width: ${RFValue(50)}px;
   height: ${RFValue(50)}px;
   border-radius: ${RFValue(30)}px;


   align-items: center;
   justify-content: center;

   background-color: ${({theme: h, focus}) => 
      focus ? h.colors.focus : h.colors.focus_light};
   margin-bottom: ${RFValue(25)}px;
`


export const Title = styled.Text``