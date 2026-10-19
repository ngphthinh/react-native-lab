export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  Auth: { redirectTo?: 'Checkout' | 'BookDetail'; redirectParams?: { bookId: string } } | undefined;
  BookDetail: { bookId: string };
};
