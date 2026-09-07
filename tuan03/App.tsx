import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProfileScreen from './src/screen/ProfileScreen';
import HomeScreen, { ThemeContext } from './src/screen/HomeScreen';
import { User, UserContext, UserContextType } from './src/store/UserContext';


// 1. Define the User Type and Context

const data: User = { name: 'Nguyễn Phước Thịnh', email: "nguyenphuocthinh@gmail.com", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVtKwhGEcOi0kanjO_4i97mUDQWdoLdAqVmGpc2Evz5Q&s=10" }


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(data);

  const toggleTheme = () => {
    setIsDarkMode(previousMode => !previousMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* 2. Added a main wrapper container to layout both components */}
      <View style={[styles.mainAppContainer, { backgroundColor: isDarkMode ? '#222222' : '#ffffff' }]}>
        <HomeScreen />
        <UserContext.Provider value={{user, setUser}}>
          <ProfileScreen />
        </UserContext.Provider>
      </View>
    </ThemeContext.Provider>
  );
}

export const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  homeContainer: {
    padding: 20,
    borderRadius: 8,
    gap: 16,
    alignItems: 'center',
  },
});
