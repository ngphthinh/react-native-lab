import { RouteProp, useRoute } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { RootStackParamList } from '../types';

type BookDetailRouteProp = RouteProp<
  RootStackParamList,
  'BookDetail'
>;

export default function BookDetailScreen() {
  const route = useRoute<BookDetailRouteProp>();
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: book.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.info}>Tác giả: {book.author}</Text>
      <Text style={styles.info}>Thể loại: {book.category}</Text>

      <Text style={styles.price}>
        {book.price.toLocaleString('vi-VN')} đ
      </Text>

      <Text style={styles.heading}>Mô tả sách</Text>
      <Text style={styles.description}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});