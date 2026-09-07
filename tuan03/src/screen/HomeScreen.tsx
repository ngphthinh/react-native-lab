import { createContext, useContext } from "react";
import { Button, Text, View } from "react-native";
import { styles } from "../../App";

// Theme Context Setup
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function HomeScreen() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('HomeScreen must be used within a ThemeProvider');
  }
  const { isDarkMode, toggleTheme } = context;

  return (
    <View style={[styles.homeContainer, { backgroundColor: isDarkMode ? '#222222' : '#ffffff' }]}>
      <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>
        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
      </Text>
      <Button title="Đổi giao diện" onPress={toggleTheme} />
    </View>
  );
}