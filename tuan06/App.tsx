import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import CustomTabBar from './src/components/CustomTabBar';
import CategoryScreen from './src/screens/CategoryScreen';
import AccountScreen from './src/screens/AccountScreen';


// ====================
// HOME STACK
// ====================

export type HomeStackParamList = {
  Home: undefined;
  BookDetail: {
    bookId: number;
  };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{
          title: 'Chi tiết sách',
        }}
      />
    </HomeStack.Navigator>
  );
}

// ====================
// CART STACK
// ====================

export type CartStackParamList = {
  Cart: undefined;
  Checkout: {
    total: number;
  };
};

const CartStack = createNativeStackNavigator<CartStackParamList>();

function CartStackNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />

      <CartStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Thanh toán',
        }}
      />
    </CartStack.Navigator>
  );
}

// ====================
// BOTTOM TAB
// ====================

export type RootTabParamList = {
  HomeStack: undefined;
  Category: undefined;
  Cart: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Danh mục',
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          title: 'Giỏ hàng',
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
}

// ====================
// APP
// ====================

export default function App() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
