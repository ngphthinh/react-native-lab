import axios from "axios";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { api } from "../type/constants";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(api.POSTS);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>Title: {item.title}</Text>
            <Text>Body: {item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewsFeed;
