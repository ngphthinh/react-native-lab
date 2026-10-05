import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieList from "./src/componets/MovieList";

export interface Movie {
  title: string;
  gender: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
  id: string;
}

const LIMIT = 10;

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorPage, setErrorPage] = useState<number | null>(null);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  const fetchPage = async (page: number, refresh = false) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setErrorPage(null);

    try {
      const res = await fetch(
        `https://6ac33b04ae53bf25b80e2df5.mockapi.io/api/v1/movies?page=${page}&limit=${LIMIT}`
      );


      const data: Movie[] = await res.json();

      setMovies((prev) => {
        if (refresh) return data;

        const map = new Map(prev.map((movie) => [movie.id, movie]));
        data.forEach((movie) => map.set(movie.id, movie));

        return Array.from(map.values());
      });

      pageRef.current = page;

      if (data.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      setErrorPage(page);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1, true);
  }, []);

  const loadMore = () => {
    if (!hasMore || loadingRef.current || errorPage !== null) return;

    fetchPage(pageRef.current + 1);
  };

  const refresh = async () => {
    pageRef.current = 1;
    setHasMore(true);
    setErrorPage(null);

    await fetchPage(1, true);
  };

  const retry = () => {
    if (errorPage !== null) {
      fetchPage(errorPage);
    }
  };

  if (loading && movies.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>Mobile View</Text>

          <MovieList
            movies={movies}
            onRefresh={refresh}
            onLoadMore={loadMore}
            loading={loading}
            hasMore={hasMore}
            errorPage={errorPage}
            onRetry={retry}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
  },
});
