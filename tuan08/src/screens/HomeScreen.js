// Placeholder - thay bằng HomeScreen của bạn, chỉ cần giữ <HomeAuthBar />
import React from 'react';
import { View, Text, Button } from 'react-native';
import HomeAuthBar from '../components/HomeAuthBar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <HomeAuthBar />
      <Text style={{ fontSize: 18 }}>Trang chủ</Text>
      <Button title="Xem giỏ hàng" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}
