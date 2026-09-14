import axios from "axios";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { api, ApiResponse } from "../type/constants";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
}

const UserList = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchUsers = async () => {
    try {
      const response = await axios.get<ApiResponse<User>>(api.USERS);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Loading lần đầu
  React.useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        await fetchUsers();
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchUsers();
    } finally {
      setRefreshing(false);
    }
  };
 if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={users}
         onRefresh={handleRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>Username: {item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserList;
