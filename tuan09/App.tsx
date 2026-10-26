import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';

const RootStack = createNativeStackNavigator({
  screens: {
      Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
     BookDetail: {
      screen: BookDetailScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}