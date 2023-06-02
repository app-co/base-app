import React from 'react';

import { Box, Container, Title, TitleDescricao } from './styles';

const Itens = [
  { nome: 'NENHUM', descricao: '' },
  { nome: 'ALIMENTAÇAO', descricao: '' },
  { nome: 'VESTUÁRIO', descricao: '' },
  {
    nome: 'TEC. INFORMÁTICA. ',
    descricao: '',
  },
  { nome: 'MARKETING E SITES', descricao: '' },
  { nome: 'CONTÁBIL E FISCAL', descricao: '' },
  { nome: 'ARQ. CONTRUÇAO', descricao: '' },
  { nome: 'MÓVEIS E DECORAÇÃO', descricao: '' },
  { nome: 'SAÚDE E BEM ESTAR', descricao: '' },
  { nome: 'BELEZA', descricao: '' },
  { nome: 'PET', descricao: '' },
  { nome: 'VEICULAR', descricao: '' },
  { nome: 'IMOBILIÁRIA E CORRETOR', descricao: '' },
  { nome: 'FOTOGRAFIA E VIDEO', descricao: '' },
  { nome: 'TERAPIAS E SAÚDE MENTAL', descricao: '' },
  { nome: 'TREINAMENTO E COACHING', descricao: '' },
  { nome: 'SEGURANÇA', descricao: '' },
  { nome: 'BRINQUEDOS', descricao: '' },
  { nome: 'FINANCEIRO', descricao: '' },
  { nome: 'LEMPEZA E MANUTENÇAO', descricao: '' },
  { nome: 'JORNALISMO', descricao: '' },
  { nome: 'EDUCAÇÃO', descricao: '' },
  { nome: 'PRESENTES', descricao: '' },
  { nome: 'MUSICA', descricao: '' },
];

interface Props {
  selectItem: (item: string) => void;
}

export function ToglleRamo({ selectItem }: Props) {
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
