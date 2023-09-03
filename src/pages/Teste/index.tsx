import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  ImageSVG,
  rect,
  rrect,
  useSVG,
} from '@shopify/react-native-skia';
import React from 'react';
import { Text } from 'react-native';

import logo from '../../assets/LOGO.svg';
import * as S from './styles';

export function Teste() {
  const svg = useSVG(logo);

  return (
    <Canvas style={{ width: 200, height: 256 }}>
      <Fill color="#1496c2" />
      <Box box={rrect(rect(14, 64, 158, 128), 24, 24)} color="#4cad54c">
        <BoxShadow dx={20} dy={10} blur={10} color="#313131" inner />
        <BoxShadow dx={-10} dy={-10} blur={10} color="#08191b" inner />
        <BoxShadow dx={10} dy={10} blur={10} color="#93b8c4" />
        <BoxShadow dx={-10} dy={-10} blur={10} color="#c7f8ff" />
      </Box>
    </Canvas>
  );
}
