import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const BOOKS = [
  {
    id: "1",
    title: "Nhà Giả Kim",
    price: "79.000 đ",
    image: "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+1",
  },
  {
    id: "2",
    title: "Đắc Nhân Tâm",
    price: "85.000 đ",
    image: "https://via.placeholder.com/300x400/10B981/FFFFFF?text=Book+2",
  },
  {
    id: "3",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    price: "90.000 đ",
    image: "https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Book+3",
  },
  {
    id: "4",
    title: "Hành Trình Về Phương Đông",
    price: "110.000 đ",
    image: "https://via.placeholder.com/300x400/EF4444/FFFFFF?text=Book+4",
  },
];

export default function BookGrid() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.headerTitle}>Book Grid</Text>

      <View style={styles.gridContainer}>
        {BOOKS.map((book) => (
          <View key={book.id} style={styles.cardItem}>
            <Image
              source={{ uri: book.image }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.bookPrice}>{book.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#111827",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardItem: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coverImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#E5E7EB",
  },
  infoContainer: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#EF4444",
  },
});
