import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeAuthBar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  if (!user) {
    return <Button title="Đăng nhập" onPress={() => navigation.navigate('Auth')} />;
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>{user.email}</Text>
      <Button title="Đăng xuất" onPress={() => dispatch(logout())} />
    </View>
  );
}
