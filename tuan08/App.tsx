import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { hydrateAuth } from "./src/redux/authSlice";
import { useAppDispatch, useAppSelector } from "./src/redux/hooks";
import AppNavigator from "./src/navigation/AppNavigator";

function Root() {
  const dispatch = useAppDispatch();
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  // Auto-login: chạy 1 lần khi mở app
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
