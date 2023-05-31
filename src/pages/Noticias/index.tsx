/* eslint-disable import/prefer-default-export */
import React, { useCallback } from "react";
import { Button, Dimensions, Modal, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import image from "../../assets/download.jpg";
import {
  BoxAvatar,
  BoxImage,
  BoxNoticia,
  Container,
  Header,
  Image,
  SubTitle,
  Titl,
  Title,
} from "./styles";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

interface Props {
  pres: () => void;
  titulo: string;
  subTitulo: string;
}

export function Noticias({ pres, titulo, subTitulo }: Props) {
  const pre = useCallback(() => {
    console.log("ok");
  }, []);

  return (
    <Container>
      <Header>
        <BoxAvatar onPress={pres}>
          <AntDesign name="back" size={RFValue(30)} />
        </BoxAvatar>
        <Titl>AVISO INTERNO</Titl>
      </Header>
      <View>
        <BoxImage onPress={pres}>
          <Image
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
            source={image}
          />
        </BoxImage>
      </View>

      <Title>{titulo}</Title>
      <BoxNoticia>
        <SubTitle>{subTitulo}</SubTitle>
      </BoxNoticia>
    </Container>
  );
}
