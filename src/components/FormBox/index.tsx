import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { Alert } from 'react-native';

import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';

import { Container } from './styles';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleSubmit() {
    try {
      const id = uuid();
      const data = {
        description,
        quantity,
        createdAt: new Date(),
      }
      await firestore().collection('products').doc(id).set(data);
      setDescription('');
      setQuantity(0);
      Alert.alert('Sucesso ✅', 'Produto cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ❌ ', 'Erro ao cadastrar produto');
    }
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        onChangeText={value => setQuantity(Number(value))}
        size="small"
        style={{ marginHorizontal: 8 }}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleSubmit}
      />
    </Container>
  );
}
