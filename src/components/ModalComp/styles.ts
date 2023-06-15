import styled from 'styled-components/native';

import theme from '../../global/styles/theme';
import { _height, _subTitle, _title } from '../../utils/size';

export const Container = styled.View`
  flex: 1;
  background-color: rgba(51, 51, 51, 0.823);
`;

export const title = styled.Text`
  font-size: ${_subTitle}px;
  font-family: 'bold';
`;

export const box = styled.View`
  background-color: #a1a1a1;
  padding: 20px;
`;
