import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

const BOOKS = [
  {
    id: "1",
    title: "Nhà Giả Kim",
    price: "79.000 đ",
    originalPrice: "99.000 đ",
    badgeText: "-20%",
    badgeColor: "#EF4444",
    image: "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+1",
  },
  {
    id: "2",
    title: "Đắc Nhân Tâm",
    price: "85.000 đ",
    originalPrice: null,
    badgeText: "MỚI",
    badgeColor: "#10B981",
    image: "https://via.placeholder.com/300x400/10B981/FFFFFF?text=Book+2",
  },
  {
    id: "3",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    price: "90.000 đ",
    originalPrice: "120.000 đ",
    badgeText: "HOT",
    badgeColor: "#F59E0B",
    image: "https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Book+3",
  },
  {
    id: "4",
    title: "Hành Trình Về Phương Đông",
    price: "110.000 đ",
    originalPrice: null,
    badgeText: null,
    image: "https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=Book+4",
  },
];

export default function BookBadgeExample({
  setItemCount,
}: {
  setItemCount: () => void;
}) {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.headerTitle}>Sách có Badge nổi</Text>

      <View style={styles.gridContainer}>
        {BOOKS.map((book) => (
          <Pressable
            key={book.id}
            style={styles.cardItem}
            onPress={setItemCount}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: book.image }}
                style={styles.coverImage}
                resizeMode="cover"
              />
              {book.badgeText && (
                <View
                  style={[styles.badge, { backgroundColor: book.badgeColor }]}>
                  <Text style={styles.badgeText}>{book.badgeText}</Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {book.title}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.bookPrice}>{book.price}</Text>
                {book.originalPrice && (
                  <Text style={styles.originalPrice}>{book.originalPrice}</Text>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#E5E7EB",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
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
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bookPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#EF4444",
  },
  originalPrice: {
    fontSize: 11,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
});
