import React, { createContext, useContext, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ProfileScreen from "./src/screen/ProfileScreen";
import HomeScreen, { ThemeContext } from "./src/screen/HomeScreen";
import { User, UserContext, UserContextType } from "./src/store/UserContext";
import CartScreen from "./src/screen/CartScreen";
import LoginScreen from "./src/screen/LoginScreen";
import ProductScreen from "./src/screen/ProductScreen";
import TodoScreen from "./src/screen/TodoScreen";

// 1. Define the User Type and Context

const data: User = {
  name: "Nguyễn Phước Thịnh",
  email: "nguyenphuocthinh@gmail.com",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVtKwhGEcOi0kanjO_4i97mUDQWdoLdAqVmGpc2Evz5Q&s=10",
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(data);

  const toggleTheme = () => {
    setIsDarkMode((previousMode) => !previousMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* 2. Added a main wrapper container to layout both components */}
      <View
        style={[
          styles.mainAppContainer,
          { backgroundColor: isDarkMode ? "#222222" : "#ffffff" },
        ]}>
        {/* <HomeScreen /> */}
        {/* <UserContext.Provider value={{user, setUser}}>
          <ProfileScreen />
        </UserContext.Provider> */}
        {/* <CartScreen /> */}
        {/* <LoginScreen /> */}
        {/* <ProductScreen /> */}
        <TodoScreen />
      </View>
    </ThemeContext.Provider>
  );
}

export const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1, // Để chiếm toàn bộ màn hình
  },
  homeContainer: {
    padding: 20,
    borderRadius: 8,
    gap: 16,
    alignItems: "center",
  },
});
