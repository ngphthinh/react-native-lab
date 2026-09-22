import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface BookDetailProps {
  coverUri: string;
  title: string;
  author: string;
  price: string;
  description: string;
}

export default function BookDetailScreen({
  coverUri,
  title,
  author,
  price,
  description,
}: BookDetailProps) {
  return (
    <View style={styles.container}>
      {/* --- Phần cố định trên: ảnh bìa --- */}
      <View style={styles.coverWrapper}>
        <Image
          source={{ uri: coverUri }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      </View>

      {/* --- Phần cuộn được ở giữa --- */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.price}>{price}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>
      </ScrollView>

      {/* --- Phần cố định dưới: thêm vào giỏ --- */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá</Text>
          <Text style={styles.bottomPrice}>{price}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => alert("Đã thêm vào giỏ!")}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // --- Ảnh bìa ---
  coverWrapper: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  coverImage: {
    alignSelf: "center",
    width: "70%",
    aspectRatio: 3 / 4, // giữ tỉ lệ bìa sách
    borderRadius: 8,
    backgroundColor: "#D6DCE5",
  },

  // --- ScrollView giữa ---
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleBox: {
    backgroundColor: "#E8ECF7",
    borderWidth: 1,
    borderColor: "#8A94A6",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
  },
  author: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  priceBox: {
    backgroundColor: "#DCEFDC",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F5D2C",
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: "#374151",
  },

  // --- Thanh dưới cùng: cố định, ngoài ScrollView ---
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    // đổ bóng nhẹ để tách biệt với nội dung cuộn phía trên
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  bottomLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  bottomPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
