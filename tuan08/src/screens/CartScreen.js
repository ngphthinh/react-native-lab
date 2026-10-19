// Placeholder - chỉ cần giữ logic ở nút Thanh toán
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function CartScreen({ navigation }) {
  const token = useSelector((s) => s.auth.token);

  const onCheckout = () => {
    if (!token) {
      navigation.navigate('Auth', { redirectTo: 'Checkout' });
    } else {
      navigation.navigate('Checkout');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text>Giỏ hàng (demo)</Text>
      <Button title="Thanh toán" onPress={onCheckout} />
    </View>
  );
}
