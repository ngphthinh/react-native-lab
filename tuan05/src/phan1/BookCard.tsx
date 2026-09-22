import { Image, StyleSheet, Text, View } from "react-native";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  image: string;
}

export default function BookCard({
  title,
  author,
  price,
  image,
}: BookCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          Tên sách: {title}
        </Text>

        <Text style={styles.text}>Tác giả: {author}</Text>

        <Text style={styles.price}>Giá: {price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightgray",
    padding: 8,
    margin: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    borderRadius: 8,
    width: 80,
    height: 110,
  },

  content: {
    marginLeft: 16,
    flex: 1,
  },

  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },

  text: {
    marginBottom: 6,
  },

  price: {
    marginTop: 2,
    fontWeight: "bold",
  },
});
