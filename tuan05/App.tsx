import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "./src/phan1/Header";
import BookCard from "./src/phan1/BookCard";
import CategoryChips from "./src/phan2/CategoryChips";
import BookGrid from "./src/phan2/BookGrid";
import BookBadgeExample from "./src/phan3/BookBadgeExample";
import FloatingCartButton from "./src/phan3/FloatingCartButton";
import React from "react";
import BookDetailScreen from "./src/phan4/BookDetailScreen";
import BottomTabBar, { TabKey } from "./src/phan5/BottomTabBar";
import CartScreen from "./src/phan5/CartScreen";
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVtKwhGEcOi0kanjO_4i97mUDQWdoLdAqVmGpc2Evz5Q&s=10",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
];

export default function App() {
  const [itemCount, setItemCount] = React.useState(4);
  const [activeTab, setActiveTab] = React.useState<TabKey>("home");
  const handleSetItemCount = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Header />

        <CategoryChips />
        <BookBadgeExample setItemCount={handleSetItemCount} />
      </ScrollView>
      <FloatingCartButton itemCount={itemCount} /> */}
      {/* <BookDetailScreen
        coverUri={books[0].image}
        title={books[0].title}
        author={books[0].author}
        price={books[0].price.toString()}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      /> */}
      <CartScreen />
      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
});
