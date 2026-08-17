import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SmartCampus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
});