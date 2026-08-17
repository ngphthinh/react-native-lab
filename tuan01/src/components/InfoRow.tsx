import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface InfoRowProps {
    label:string,
    value:string
    
}

export default function InfoRow({ label, value }:InfoRowProps) {
  return (
    <Text style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}: </Text>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  infoRow: { fontSize: 12, color: '#333A45', marginBottom: 4 },
  infoLabel: { fontWeight: '600' },
});