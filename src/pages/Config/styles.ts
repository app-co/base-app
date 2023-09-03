import { TextInput } from 'react-native';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _hight, _subTitle, _title, _width } from '@/styles/sizes';

interface ISelecWeek {
  isSelect: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.light.gray};
  padding: 20px;
  padding-bottom: 0;
`;

export const title = styled.Text`
  /* font-family: 'Regular'; */
  font-size: ${_title}px;
  color: ${cor.light.gray};
`;

export const box = styled.View`
  background-color: rgba(217, 217, 217, 1);
  padding: 10px 20px;
  width: 100%;
  border-radius: 10px;
  min-height: ${_hight * 0.28}px;
  margin: 15px 0;

  justify-content: space-between;
`;

export const input = styled(TextInput)`
  background-color: ${cor.light['glow-b']};
  width: 87px;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  border-radius: 10px;
  font-weight: 600;
  color: ${cor.light.black};
`;

export const boxSem = styled.TouchableOpacity`
  width: 65px;
  height: 40px;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background-color: ${cor.light.gray};
`;

export const titleSem = styled.Text`
  /* font-family: 'Regular'; */
  font-size: ${_subTitle}px;
  color: ${cor.light.black};
`;

export const grid = styled.View`
  width: 100%;
  flex-wrap: wrap;
  max-height: 80px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  /* background-color: red; */
`;

export const box1 = styled.TouchableOpacity<ISelecWeek>`
  background-color: ${h => (h.isSelect ? cor.light.gray : cor.light['glow-a'])};
  width: ${_width * 0.17}px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 5px 10px;
`;
