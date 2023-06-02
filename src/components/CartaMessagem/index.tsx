import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Box, Center } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '../../global/styles/theme';

interface Props {
  pres: () => void;
  quantity: number;
}

export function CartaMessagem({ pres, quantity }: Props) {
  return (
    <Box>
      <TouchableOpacity onPress={pres}>
        <Center
          top="2"
          bg={theme.colors.focus_second}
          borderRadius="30"
          size="5"
        >
          <Text
            fontFamily={theme.fonts.bold}
            color={theme.colors.text_secundary}
          >
            {quantity}
          </Text>
        </Center>
        <MaterialCommunityIcons
          color={theme.colors.focus}
          size={40}
          name="email-outline"
        />
      </TouchableOpacity>
    </Box>
  );
}
