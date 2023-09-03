import React from 'react';
import { FlatList } from 'react-native';

import { ClientsList } from '../../components/ClientsList';
import { Menu } from '../../components/Menu';
import * as S from './styles';

const list = [1, 2, 3, 4, 5, 6];

export function Clientes() {
  const [edit, setEdit] = React.useState(false);
  return (
    <>
      <Menu variant="gray" />
      <S.Container>
        <FlatList
          data={list}
          keyExtractor={h => h}
          renderItem={({ item: H }) => (
            <ClientsList pres={() => setEdit(!edit)} edit={edit} />
          )}
        />
      </S.Container>
    </>
  );
}
