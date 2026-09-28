import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../App';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>;

const books = [
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
  },
  {
    id: 3,
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
  },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Trang chủ
      </Text>

      <Text style={styles.subtitle}>
        Sách nổi bật
      </Text>

      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate('BookDetail', {
              bookId: book.id,
            })
          }
        >
          <Text style={styles.bookTitle}>
            {book.title}
          </Text>

          <Text style={styles.bookId}>
            Book ID: {book.id}
          </Text>

          <Text style={styles.detail}>
            Xem chi tiết →
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  bookId: {
    color: '#666666',
    marginBottom: 8,
  },

  detail: {
    color: '#E53935',
    fontWeight: '600',
  },
});
