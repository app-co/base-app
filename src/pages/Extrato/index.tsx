import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, HStack, Modal, VStack } from 'native-base';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory-native';

import { Button } from '@/components/Button';
import { Menu } from '@/components/Menu';
import { useAuth } from '@/hooks/useAuth';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _money } from '@/utils/mask/hora';

import * as S from './styles';

const data = [{ x: 'Jan', y: 5 }];
const datas = [{ x: 'Jan', y: 3 }];
const datab = [{ x: 'Jan', y: 4 }];
const months = [{ month: 'Jan' }];

export function Extrato() {
  const [showModal, setShowModal] = useState(false);
  const { provider } = useAuth();

  const extrato = React.useCallback(async () => {
    const { appointment } = provider;
    const desmarcado = appointment.filter(h => h.status === 'desmarcado');
    const total = appointment.length;
  }, []);

  return (
    <S.Container>
      <Menu title="Sua performace" />

      <Modal
        bg="rgba(114, 114, 114, 0.849)"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Content bg={cor.light.black_b} minWidth="380">
          <Modal.CloseButton mb="4" bg={cor.light['glow-b']} />
          <Modal.Header bg={cor.light.black_b}>
            <S.sutitle>Entenda este valor</S.sutitle>
          </Modal.Header>
          <Modal.Body>
            <VStack mt="4" space={3}>
              <Box>
                <S.sutitle fontWeight="medium">
                  Pagementos no credito (PC)
                </S.sutitle>
                <S.text>%5</S.text>
              </Box>

              <Box>
                <S.sutitle>SubTotal</S.sutitle>
                <S.text>subtotal = total - (total * PC)</S.text>
              </Box>

              <Box>
                <S.sutitle>Exemplo</S.sutitle>
                <S.text>Total bruto: R$ 350,00</S.text>
                <S.text>subtotal = 350 - (350 * 0.05) </S.text>

                <S.text>Valor líquido a receber: R$ 332,50</S.text>
              </Box>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <S.content>
        <VStack space={2}>
          <HStack space={2} alignItems="center">
            <Box flex="1">
              <S.text>Total de agendamentos:</S.text>
            </Box>

            <HStack justifyContent="space-between" w="1/3">
              <S.text style={{ color: '#34b330', fontFamily: font.bold }}>
                {provider.appointment.length}
              </S.text>

              <S.text>$1.000,00</S.text>
            </HStack>
          </HStack>

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <S.text>Agendamentos realizados:</S.text>
            </Box>

            <HStack justifyContent="space-between" w="1/3">
              <S.text style={{ color: '#34b330', fontFamily: font.bold }}>
                {provider.appointment.length}
              </S.text>

              <S.text>$1.000,00</S.text>
            </HStack>
          </HStack>

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <S.text>Agendamentos cancelados:</S.text>
            </Box>

            <HStack justifyContent="space-between" w="1/3">
              <S.text style={{ color: '#ff3c35', fontFamily: font.bold }}>
                {provider.appointment.length}
              </S.text>

              <S.text>$1.000,00</S.text>
            </HStack>
          </HStack>
        </VStack>
      </S.content>

      <S.chartBox>
        <VictoryChart height={200}>
          <VictoryGroup
            animate={{
              duration: 500,
              onLoad: { duration: 1000 },
            }}
            x="month"
            offset={7}
            colorScale={[
              cor.light['glow-c'],
              cor.light['glow-b'],
              cor.light.black_b,
            ]}
          >
            <VictoryBar
              style={{ labels: { fill: cor.light['glow-c'] } }}
              data={data}
              categories={{ x: months.map(h => h.month) }}
            />

            <VictoryBar
              style={{ labels: { fill: cor.light['glow-c'] } }}
              data={datas}
            />

            <VictoryBar
              style={{ labels: { fill: cor.light['glow-c'] } }}
              data={datab}
            />
          </VictoryGroup>
        </VictoryChart>
      </S.chartBox>

      <S.content>
        <S.title>Extrato</S.title>

        <HStack mb="4" justifyContent="space-between">
          <S.sutitle>Valor bruto:</S.sutitle>
          <S.sutitle style={{ fontFamily: 'Bold', color: cor.light['glow-c'] }}>
            R$ 100,00
          </S.sutitle>
        </HStack>

        <HStack mb="4" justifyContent="space-between">
          <Box>
            <S.sutitle>Valor liquido:</S.sutitle>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <S.text style={{ color: '#fff871' }}>Entenda esse valor</S.text>
            </TouchableOpacity>
          </Box>
          <S.sutitle style={{ fontFamily: 'Bold', color: cor.light['glow-c'] }}>
            R$ 100,00
          </S.sutitle>
        </HStack>

        <HStack mb="4" justifyContent="space-between">
          <S.sutitle>Saldo:</S.sutitle>
          <S.sutitle style={{ fontFamily: 'Bold', color: cor.light['glow-c'] }}>
            {_money('0')}
          </S.sutitle>
        </HStack>

        <Button onPress={() => console.log('recebeu')} title="RECEBER" />
      </S.content>
    </S.Container>
  );
}
