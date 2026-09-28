import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../App';

type Props = NativeStackScreenProps<
  CartStackParamList,
  'Checkout'
>;

export default function CheckoutScreen({
  route,
}: Props) {
  const { total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Thanh toán
      </Text>

      <Text style={styles.label}>
        Tổng tiền
      </Text>

      <Text style={styles.total}>
        {total.toLocaleString('vi-VN')} đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },

  total: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E53935',
  },
});
