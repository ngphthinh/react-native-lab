import { ActivityIndicator, FlatList, Switch, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../../App";
import { useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  onRefresh,
  onLoadMore,
  loading,
  hasMore,
  errorPage,
  onRetry,
}: {
  movies: Movie[];
  onRefresh: () => Promise<void>;
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  errorPage: number | null;
  onRetry: () => void;
}) => {
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const footer = () => {
    if (errorPage !== null) {
      return (
        <View>
          <Text>Tải thất bại</Text>
          <TouchableOpacity onPress={onRetry}>
            <Text>Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (loading) {
      return <ActivityIndicator />;
    }

    if (!hasMore) {
      return <Text style={{ textAlign: "center" }}>— Đã hết danh sách —</Text>;
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={String(isTile)}
        data={movies}
        numColumns={isTile ? 2 : 1}
        columnWrapperStyle={
          isTile ? { justifyContent: "space-between" } : undefined
        }
        ListHeaderComponent={
          <Switch value={isTile} onValueChange={setIsTile} />
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            layout={isTile ? "tile" : "row"}
            onSelect={(id) => console.log(id)}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footer}
      />
    </View>
  );
};

export default MovieList;
