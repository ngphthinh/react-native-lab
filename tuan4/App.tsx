import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NewsFeed from './src/bai9/NewsFeed';
import Profile from './src/bai10/Profile';
import ProductList from './src/bai11/ProductList';
import UserList from './src/bai14/UserList';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <NewsFeed/> */}
      {/* <Profile/> */}
      {/* <ProductList/> */}
      <UserList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
