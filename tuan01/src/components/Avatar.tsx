import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AvatarProps {
    uri?:string,
    initials:string
}

export default function Avatar({ uri, initials }: AvatarProps) {
  return uri ? (
    <Image
      source={{ uri }}
      style={styles.avatarImage}
      resizeMode="cover"
      accessible
      accessibilityRole="image"
      accessibilityLabel="Ảnh đại diện sinh viên"
    />
  ) : (
    <View style={styles.avatarFallback}>
      <Text style={styles.avatarInitials}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: { width: 64, height: 64, borderRadius: 32 },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3EEFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { color: '#1565C0', fontWeight: '700', fontSize: 16 },
});