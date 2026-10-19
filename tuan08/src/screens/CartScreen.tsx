import React from 'react';
import { View, Text, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import type { RootStackParamList } from '../navigation/types';

export default function CartScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Cart'>) {
  const token = useAppSelector((s) => s.auth.token);

  const onCheckout = () => {
    if (!token) navigation.navigate('Auth', { redirectTo: 'Checkout' });
    else navigation.navigate('Checkout');
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text>Giỏ hàng (demo)</Text>
      <Button title="Thanh toán" onPress={onCheckout} />
    </View>
  );
}
