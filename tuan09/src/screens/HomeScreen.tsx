import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
  const fetchBooks = async () => {
    try {
      const res = await axios.get<Book[]>(
        'http://localhost:3000/books'
      );
      setBooks(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sách:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách sách</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookCard} onPress={()=> navigation.navigate('BookDetail', { book: item })}>
            <Image
              source={{ uri: item.image }}
              style={styles.bookImage}
            />

            <View style={styles.bookInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Tác giả: {item.author}</Text>
              <Text>Thể loại: {item.category}</Text>
              <Text style={styles.price}>
                Giá: {item.price.toLocaleString('vi-VN')} đ
              </Text>
              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text>Không có sách nào.</Text>
        }
      />
      <Button title='Logout' onPress={()=>navigation.navigate("Login")}></Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookCard: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  bookImage: {
    width: 100,
    height: 145,
    borderRadius: 6,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    marginTop: 6,
    fontSize: 12,
  },
});