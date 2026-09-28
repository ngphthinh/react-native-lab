import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../App';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'BookDetail'
>;

export default function BookDetailScreen({
  route,
}: Props) {
  const { bookId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chi tiết sách
      </Text>

      <Text style={styles.label}>
        Book ID:
      </Text>

      <Text style={styles.id}>
        {bookId}
      </Text>

      <Text style={styles.description}>
        Đây là màn hình chi tiết sách.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    color: '#666666',
  },

  id: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E53935',
    marginVertical: 10,
  },

  description: {
    fontSize: 16,
    color: '#555555',
  },
});
