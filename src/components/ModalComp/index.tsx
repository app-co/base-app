/* eslint-disable react/require-default-props */
import * as Ico from 'phosphor-react-native';
import React, { ReactNode } from 'react';
import { Modal } from 'react-native';

import { Button } from '../Button';
import * as S from './styles';

interface IProps {
  title?: string;
  closed: () => void;
  showModal: boolean;
  component: ReactNode;
}

export function ModalComp({ title, closed, showModal, component }: IProps) {
  return (
    <S.modal visible={showModal} transparent>
      <S.Container>
        <S.content>
          <S.header>
            <S.title>{title}</S.title>
            <S.closed onPress={closed}>
              <Ico.XCircle weight="duotone" color="#9c1919" size={42} />
            </S.closed>
          </S.header>

          {component}
        </S.content>
      </S.Container>
    </S.modal>
  );
}
