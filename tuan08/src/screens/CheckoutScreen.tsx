import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import type { RootStackParamList } from '../navigation/types';

export default function CheckoutScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Checkout'>) {
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => {
    if (!token) navigation.replace('Auth', { redirectTo: 'Checkout' });
  }, [token, navigation]);

  if (!token) return null;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Màn hình Thanh toán</Text>
    </View>
  );
}
