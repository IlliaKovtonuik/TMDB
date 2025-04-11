import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MoviesGridProps {
  movies: Movie[];
  onEndReached: () => void;
  loadingMore: boolean;
}

export const MoviesGrid: React.FC<MoviesGridProps> = ({
  movies,
  onEndReached,
  loadingMore,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="tomato" />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  footer: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridContent: {
    justifyContent: "center",
  },
});
