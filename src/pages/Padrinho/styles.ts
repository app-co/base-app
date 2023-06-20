import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { _subTitle } from '../../utils/size';

interface props {
  afiliado: boolean;
}

export const text = styled.Text<props>`
  font-size: ${_subTitle}px;

  font-family: ${theme.fonts.medium};
  color: ${h => (h.afiliado ? '#fff' : '#020411')};
`;

export const button = styled.TouchableOpacity<props>`
  padding: 10px;
  margin-top: 5px;
  border-bottom-width: 1px;

  background-color: ${h => (h.afiliado ? '#3a5a85' : '#cecece')};
`;
