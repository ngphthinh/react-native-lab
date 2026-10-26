export interface User {
  id: number;
  email: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: { name: string };
  BookDetail: { book: Book };
};