import axios from "axios";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../type/constants";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const Profile = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(api.USER("1"));
        const data: User = response.data;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user?.name}</Text>
      <Text style={styles.text}>Username: {user?.username}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>Phone: {user?.phone}</Text>
      <Text style={styles.text}>Website: {user?.website}</Text>
      <Text style={styles.text}>
        Address: {user?.address.street}, {user?.address.suite},{" "}
        {user?.address.city}, {user?.address.zipcode}
      </Text>
      <Text style={styles.text}>
        Company: {user?.company.name}, {user?.company.catchPhrase},{" "}
        {user?.company.bs}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
