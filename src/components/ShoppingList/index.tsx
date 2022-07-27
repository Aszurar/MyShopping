import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';


export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleList() {
    try {
      setIsLoading(true);
      const subscribe = firestore().collection('products').onSnapshot(snapshot => {
        const productsData = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[]
        setProducts(productsData);
      })

      return () => subscribe();
    } catch (error) {
      console.log("🚀 ~ file: index.tsx ~ line 18 ~ handleList ~ error", error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleList();
  }, []);

  return (
    <FlatList
      data={products}
      refreshing={isLoading}
      onRefresh={handleList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
