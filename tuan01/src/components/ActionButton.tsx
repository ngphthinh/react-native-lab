import React, { useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface ActionButtonProps {
    label:string,
    onPress: ()=>void,
    disabled:boolean
}

export default function ActionButton({ label, onPress, disabled }: ActionButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[
        styles.actionButton,
        pressed && !disabled && styles.actionButtonPressed,
        disabled && styles.actionButtonDisabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled, busy: pressed }}
    >
      <Text
        style={[
          styles.actionButtonText,
          disabled && styles.actionButtonTextDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    minHeight: 48,
    minWidth: 48,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  actionButtonPressed: { backgroundColor: '#0D3E77' },
  actionButtonDisabled: { backgroundColor: '#D6DBE1' },
  actionButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, letterSpacing: 0.5 },
  actionButtonTextDisabled: { color: '#8A94A6' },
});