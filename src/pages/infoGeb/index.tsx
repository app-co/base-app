import React from "react";
import { Image, ScrollView, View } from "react-native";
import { Container, Title } from "./styles";
import imageFundo from "../../assets/imageMembros.jpeg";

import { HeaderContaponent } from "../../components/HeaderComponent";

export function InfoGeb() {
  return (
    <Container>
      <HeaderContaponent title="Conheça o Geb" type="tipo1" onMessage="of" />

      <Image
        source={imageFundo}
        style={{
          width: "100%",
          height: "30%",
          marginTop: 20,
        }}
      />

      <Title>
        Somos um grupo de empreendedores multissetorial que se reune
        semanalmente para fazer parcerias, negócios e principalmente nos
        ajudarmos mutualmente a evoluir como profissionais, melhorar os
        processos de nossas empresas afim de obtermos melhores resultados
        financeiros. Nosso projeto foi fundado em 13 de Janeiro de 2017, pelo
        Professor e Mentor corporativo Pedro Souza, atual presidente e desde
        então possui uma diretoria constituída que trabalha arduamente para
        implementar novidades constantemente no grupo. A partir do ano de 2019
        até o presente momento já foram contabilizados mais de R$ 3.271.362,78
        milhões em negócios gerados.
      </Title>
    </Container>
  );
}
