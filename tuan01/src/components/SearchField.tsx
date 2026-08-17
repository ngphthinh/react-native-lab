import { TextInput, StyleSheet } from 'react-native';

interface SearchFieldProps {
    value: string,
    onChangeText: (text: string)=> void 
}

export default function SearchField({ value, onChangeText }: SearchFieldProps) {
  return (
    <TextInput
      style={styles.searchField}
      value={value}
      onChangeText={onChangeText}
      placeholder="Tìm kiếm thông tin..."
      placeholderTextColor="#8A94A6"
      accessibilityLabel="Ô tìm kiếm thông tin sinh viên"
      accessibilityHint="Nhập từ khóa để tìm kiếm"
      returnKeyType="search"
    />
  );
}

const styles = StyleSheet.create({
  searchField: {
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 16,
  },
});