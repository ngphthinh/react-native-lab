import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function FloatingCartButton({
  itemCount,
}: {
  itemCount: number;
}) {
  return (
    <TouchableOpacity
      style={styles.cartButton}
      activeOpacity={0.8}
      onPress={() => alert("Đã bấm vào giỏ hàng!")}>
      <Text style={styles.cartButtonText}>Giỏ hàng</Text>

      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: "#4F46E5",
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 10,
  },

  badge: {
    position: "absolute",
    top: 0,
    right: -4,
    backgroundColor: "#E53E3E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    minWidth: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});
