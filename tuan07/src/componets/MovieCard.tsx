import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../../App";
import { memo } from "react";

type Layout = "row" | "tile";


const MovieCard = ({
  movie,
  layout = "row",
  onSelect,
}: {
  movie: Movie;
  layout?: Layout;
  onSelect: (id: string) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={layout === "row" ? style.rowLayout : style.tileLayout}
    >
      <View style={layout === "tile" ? style.poster : undefined}>
        <Image
          source={{ uri: movie.poster }}
          style={
            layout === "row"
              ? { width: 70, height: 100 }
              : style.tilePoster
          }
        />

        {layout === "tile" && (
          <Text style={style.rating}>⭐{movie.rating}</Text>
        )}
      </View>

      {layout === "row" ? (
        <View>
          <Text>Title: {movie.title}</Text>
          <Text>Genre: {movie.gender}</Text>
          <Text>Year: {movie.year}</Text>
          <Text>Rating: ⭐{movie.rating}</Text>
          <Text>{movie.isWatched ? "✅" : "⏳"}</Text>
        </View>
      ) : (
        <Text numberOfLines={1}>{movie.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  rowLayout: {
    flexDirection: "row",
  },
  tileLayout: {
    width: "48%",
  },
  poster: {
    position: "relative",
  },
  tilePoster: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  rating: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default memo(MovieCard)