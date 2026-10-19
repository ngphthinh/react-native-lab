import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logout } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { RootStackParamList } from '../navigation/types';

export default function HomeAuthBar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

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
