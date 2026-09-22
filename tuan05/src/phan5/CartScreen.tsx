import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// --- Kiểu dữ liệu 1 sản phẩm (sách) trong giỏ ---
interface CartProduct {
  id: string;
  imageUri: string;
  name: string; // tên sách - tác giả
  quantity: number;
  price: string;
}

// Dữ liệu gốc dạng sách (title, author, price: number, image)
interface BookData {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

const BOOKS_DATA: BookData[] = [
  {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
];

const MOCK_CART: CartProduct[] = BOOKS_DATA.map((book) => ({
  id: book.id,
  imageUri: book.image,
  name: `${book.title} - ${book.author}`,
  quantity: 1,
  price: `$${book.price.toFixed(2)}`,
}));

function CartItemRow({ item }: { item: CartProduct }) {
  return (
    <View style={styles.itemRow}>
      <View style={styles.itemImage}>
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            style={styles.itemImageInner}
          />
        ) : null}
      </View>

      <View style={styles.itemInfo}>
        <View style={styles.nameBox}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        <View style={styles.qtyBox}>
          <Text style={styles.qtyText}>SL: {item.quantity}</Text>
        </View>
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const totalPrice = `$${BOOKS_DATA.reduce((sum, b) => sum + b.price, 0).toFixed(2)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Giỏ hàng</Text>
      {/* --- VÙNG 1: Danh sách sản phẩm — cuộn được --- */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {MOCK_CART.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* --- VÙNG 2: Tổng tiền + Thanh toán — cố định, KHÔNG cuộn --- */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalTextBox}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.8}
          onPress={() => alert("Tiến hành thanh toán")}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
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

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    margin: 16,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF1F8",
    borderWidth: 1,
    borderColor: "#6B7280",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#D6DCE5",
    marginRight: 10,
    overflow: "hidden",
  },
  itemImageInner: {
    width: "100%",
    height: "100%",
  },
  itemInfo: {
    flex: 1, // chiếm hết phần còn lại giữa ảnh và giá
    justifyContent: "center",
  },
  nameBox: {
    backgroundColor: "#E5E9F3",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  itemName: {
    fontSize: 13,
    color: "#374151",
  },
  qtyBox: {
    backgroundColor: "#E5E9F3",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  qtyText: {
    fontSize: 12,
    color: "#6B7280",
  },
  priceBox: {
    width: 90, // width cố định
    backgroundColor: "#D9F2D9",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F5D2C",
  },

  // ===== Vùng 2: Thanh tổng tiền + thanh toán (cố định) =====
  checkoutBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#EEF0FA",
  },
  totalTextBox: {
    justifyContent: "center",
  },
  totalLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
  },
  checkoutButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
