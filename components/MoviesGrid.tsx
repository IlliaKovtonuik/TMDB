import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MoviesGridProps {
  movies: Movie[];
  onEndReached: () => void;
  loadingMore: boolean;
}
const { width } = Dimensions.get("window");
const ITEM_HORIZONTAL_MARGIN = 16;
const ITEM_WIDTH = (width - 16 * 2 - ITEM_HORIZONTAL_MARGIN * 2) / 2;

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
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MovieCard movie={item} />
          </View>
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
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
  row: {
    justifyContent: "space-between",
    // paddingHorizontal: 16,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 80,
  },
  cardWrapper: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_HORIZONTAL_MARGIN,
    marginBottom: 16,
  },
});
