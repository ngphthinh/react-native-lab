import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

const CATEGORIES = ["Kinh tế", "Thiếu nhi", "Ngoại ngữ", "Khoa học"];

export default function CategoryChips() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Category Chips</Text>
      <View style={[styles.container, { alignContent: "flex-start" }]}>
        {CATEGORIES.map((item, index) => (
          <Pressable key={index} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    color: "#333",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    backgroundColor: "#ededed",
    padding: 12,
    minHeight: 100,
    borderRadius: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4F46E5",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  chipText: {
    color: "#4F46E5",
    fontSize: 14,
  },
});
