import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // hoặc bộ icon bạn đang dùng

export type TabKey = "home" | "category" | "cart" | "account";

interface TabItem {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { key: "home", label: "Trang chủ", icon: "home-outline" },
  { key: "category", label: "Danh mục", icon: "grid-outline" },
  { key: "cart", label: "Giỏ hàng", icon: "cart-outline" },
  { key: "account", label: "Tài khoản", icon: "person-outline" },
];

export default function BottomTabBar({
  activeTab,
  onChangeTab,
}: {
  activeTab?: TabKey;
  onChangeTab?: (key: TabKey) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onChangeTab && onChangeTab(tab.key)}>
            <View
              style={[
                styles.iconWrapper,
                isActive && styles.iconWrapperActive,
              ]}>
              <Ionicons
                name={tab.icon}
                size={22}
                color={isActive ? "#4F46E5" : "#6B7280"}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Container: chia đều 4 phần ---
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingBottom: 8, // nên cộng thêm safe-area-inset-bottom trên thiết bị có home indicator
  },

  // --- Mỗi mục: cột, canh giữa ---
  tabItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    width: 44,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconWrapperActive: {
    backgroundColor: "#E0E7FF",
    borderWidth: 1.5,
    borderColor: "#4F46E5",
  },

  tabLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  tabLabelActive: {
    color: "#4F46E5",
    fontWeight: "600",
  },
});
