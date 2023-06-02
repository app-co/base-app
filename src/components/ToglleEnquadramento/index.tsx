import React from 'react';
import { FlatList, View } from 'react-native';
import { Box, Container, Title, TitleDescricao } from './styles';

const Itens = [
   { nome: 'MEI', descricao: 'Micro Empreendedor Individual' },
   { nome: 'ME', descricao: 'Micro individual' },
   {
      nome: 'EIRELI',
      descricao: 'Epresa Individual de Responsabilidade Limidadta',
   },
   { nome: 'LTDA', descricao: 'Sociedade Limitada' },
   { nome: 'UNIPESSOAL', descricao: 'Sociedade Limitada' },
   { nome: 'SA', descricao: 'Sociedade Anônima' },
];

interface Props {
   selectItem: (item: string) => void;
}

export function ToglleEnquadramento({ selectItem }: Props) {
   return (
      <Container>
         {Itens.map(h => (
            <Box key={h.nome} onPress={() => selectItem(h.nome)}>
               <Title>{h.nome}</Title>
               <TitleDescricao>{h.descricao}</TitleDescricao>
            </Box>
         ))}
      </Container>
   );
}
