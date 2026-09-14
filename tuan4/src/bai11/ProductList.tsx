import axios from "axios";
import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { api, filterByName } from "../type/constants";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
}

interface CustomError {
  message: string;
}

const ProductList = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [keyword, setKeyword] = React.useState<string>("");
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api.PRODUCTS("all", 10));
        // const response = await axios.get("https://dummyjson.com/productssad");
        const data = response.data.products as Product[];
        setProducts(data);
      } catch (error) {
        const customError = error as CustomError;
        alert(`Error fetching products: ${customError.message}`);
        console.log("Error fetching products:", customError.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filterByName(products, keyword);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Enter keyword"
      />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </View>
    </View>
  );
};

export default ProductList;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text>Title:{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>Category: {product.category}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Discount: {product.discountPercentage}%</Text>
      <Text>Rating: ⭐ {product.rating}</Text>
    </View>
  );
};
