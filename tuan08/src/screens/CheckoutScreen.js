import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function CheckoutScreen({ navigation }) {
  const token = useSelector((s) => s.auth.token);

  // Lớp bảo vệ thứ 2: vào thẳng Checkout bằng đường khác (deep link, v.v.)
  useEffect(() => {
    if (!token) navigation.replace('Auth', { redirectTo: 'Checkout' });
  }, [token, navigation]);

  if (!token) return null; // tránh nháy nội dung

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Màn hình Thanh toán</Text>
    </View>
  );
}
