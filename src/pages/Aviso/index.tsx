/* eslint-disable import/prefer-default-export */
import React, { useCallback, useState } from "react";
import { Dimensions, Modal, View } from "react-native";
import { BoxImage, Container, Image, Title } from "./styles";
import image from "../../assets/download.jpg";
import { Noticias } from "../Noticias";
import { HeaderContaponent } from "../../components/HeaderComponent";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

export function Aviso() {
  const [modal, setModal] = useState(false);

  const handleOpemModal = useCallback(() => {
    setModal(true);
  }, []);

  const handleOffModal = useCallback(() => {
    setModal(false);
    console.log("ok");
  }, []);

  return (
    <Container>
      <HeaderContaponent type="tipo2" onMessage="of" title="AVISOS" />
      <View>
        <BoxImage onPress={handleOpemModal}>
          <Image
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
            source={image}
          />
        </BoxImage>
        <Title>POR ESSA NAO ESPERAVA DE UM CACHORRO</Title>
        <Modal visible={modal}>
          <Noticias
            titulo="POR ESSA NAO ESPERAVA DE UM CACHORRO"
            pres={handleOffModal}
            subTitulo="E essas coisas tem de ocorrer..."
          />
        </Modal>
      </View>
    </Container>
  );
}
