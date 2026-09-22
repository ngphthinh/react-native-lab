import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../util/colors";

import { AntDesign, Feather } from "@expo/vector-icons";

interface HeaderProps {
  onSearchPress?: () => void;
  onCartPress?: () => void;
}

export default function Header({ onSearchPress, onCartPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.btn} onPress={onSearchPress}>
        <View style={styles.btnContent}>
          <Feather name="search" size={16} color="black" />
          <Text style={styles.btnText}>Tìm</Text>
        </View>
      </Pressable>

      <Pressable style={styles.btn} onPress={onCartPress}>
        <View style={styles.btnContent}>
          <AntDesign name="shopping-cart" size={16} color="black" />
          <Text style={styles.btnText}>Giỏ hàng</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },

  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  btnText: {
    color: colors.navy,
    fontWeight: "bold",
  },
});
