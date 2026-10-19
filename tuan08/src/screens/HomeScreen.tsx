import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import HomeAuthBar from '../components/HomeAuthBar';
import { Book, bookService } from '../services/bookService';
import type { RootStackParamList } from '../navigation/types';

export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    bookService.list().then(setBooks).catch(() => {});
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
      <HomeAuthBar />
      <Text style={{ fontSize: 18 }}>Trang chủ</Text>
      {books.map((b) => (
        <Button key={b.id} title={b.title} onPress={() => navigation.navigate('BookDetail', { bookId: b.id })} />
      ))}
      <Button title="Xem giỏ hàng" onPress={() => navigation.navigate('Cart')} />
    </ScrollView>
  );
}
