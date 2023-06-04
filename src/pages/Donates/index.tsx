import { Center, TextArea } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useDonate } from '../../contexts/donate';
import * as S from './styles';

export function Donates() {
  const { donateCreate } = useDonate();
  const [itens, setItens] = React.useState('');

  const handleSave = React.useCallback(async () => {
    const data = {
      itens,
    };

    donateCreate(itens).then(h => {
      Alert.alert('Sucesso!', 'Agradecemos sua preocupação com o próximo');
    });

    console.log(data);
  }, [itens]);

  return (
    <>
      <Header />
      <S.Container>
        <Center p="10">
          <S.title>Doe donativos</S.title>

          <S.title>Quais itens você dejesa doar?</S.title>

          <TextArea onChangeText={setItens} my="8" />

          <Button pres={handleSave} title="SALVAR" />
        </Center>
      </S.Container>
    </>
  );
}
