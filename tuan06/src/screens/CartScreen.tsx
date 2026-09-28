import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../App';

type Props = NativeStackScreenProps<
  CartStackParamList,
  'Cart'
>;

export default function CartScreen({ navigation }: Props) {
  const total = 350000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Giỏ hàng
      </Text>

      <View style={styles.cartBox}>
        <Text style={styles.item}>
          Sách: Đắc Nhân Tâm
        </Text>

        <Text style={styles.price}>
          350.000 đ
        </Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>
          Tổng tiền:
        </Text>

        <Text style={styles.total}>
          {total.toLocaleString('vi-VN')} đ
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Checkout', {
            total: total,
          });
        }}
      >
        <Text style={styles.buttonText}>
          Thanh toán
        </Text>
      </TouchableOpacity>
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
    marginBottom: 25,
  },

  cartBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  item: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    color: '#666666',
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
  },

  button: {
    backgroundColor: '#E53935',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
