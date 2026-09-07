import React, { memo, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
interface Product {
  id: string;
  name: string;
  price: number;
}
interface ProductItemProps {
  item: Product;
  onSelect: (item: Product) => void;
}

const ProductItem = memo(function ProductItem({
  item,
  onSelect,
}: ProductItemProps) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString("vi-VN")}đ`}
        onPress={() => onSelect(item)}
      />
    </View>
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [maxPrice, setMaxPrice] = useState(0);
  const products: Product[] = useMemo(
    () => [
      { id: "1", name: "Áo thun", price: 200000 },
      { id: "2", name: "Quần jean", price: 450000 },
      { id: "3", name: "Giày thể thao", price: 800000 },
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedKeyword) &&
          (maxPrice === 0 || product.price <= maxPrice),
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price,
      );
  }, [keyword, products, sortOrder, maxPrice]);

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0,
    );
  }, [filteredProducts]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedName(product.name);
    console.log("Đã chọn:", product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />
      <TextInput
        value={maxPrice === 0 ? "" : maxPrice.toString()}
        onChangeText={(text) => setMaxPrice(Number(text))}
        keyboardType="numeric"
        placeholder="Giá tối đa"
        style={styles.input}
      />
      <Button
        title="Tăng dần"
        color="red"
        onPress={() => setSortOrder("asc")}
      />

      <Button
        title="Giảm dần"
        color="green"
        onPress={() => setSortOrder("desc")}
      />
      <Text>Sản phẩm đã chọn: {selectedName || "Chưa chọn"}</Text>
      <Text>Tổng giá: {totalPrice.toLocaleString("vi-VN")}đ</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 8,
    padding: 12,
  },
});
