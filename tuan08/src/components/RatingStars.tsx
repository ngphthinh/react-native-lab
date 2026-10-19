import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  value: number;
  size?: number;
  max?: number;
  onChange?: (v: number) => void;
}

export default function RatingStars({ value, size = 20, max = 5, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        const star = (
          <View style={{ width: size, height: size }}>
            <Text style={{ fontSize: size, lineHeight: size, color: '#d1d5db' }}>★</Text>
            <View style={{ position: 'absolute', overflow: 'hidden', width: size * fill }}>
              <Text style={{ fontSize: size, lineHeight: size, color: '#f59e0b' }}>★</Text>
            </View>
          </View>
        );
        return onChange ? (
          <TouchableOpacity key={i} onPress={() => onChange(i + 1)} hitSlop={4}>
            {star}
          </TouchableOpacity>
        ) : (
          <View key={i}>{star}</View>
        );
      })}
    </View>
  );
}
