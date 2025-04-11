import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "@/store/store";
import { MoviesGrid } from "@/components/MoviesGrid";
import { FilterModal } from "@/components/FilterModal";
import { filterAndSortMovies, SortOption } from "@/helpers/filterAndSortMovies";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(null);

  const favorites = useAppSelector((state) => state.favorites.favorites);

  const { movies, page, loading, loadingMore, loadMore } = usePopularMovies(
    !showFavorites
  );

  const moviesToRender = filterAndSortMovies(movies, favorites, {
    onlyFavorites: showFavorites,
    sortBy,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#030014" }}>
      {loading && page === 1 && !showFavorites ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <MoviesGrid
          movies={moviesToRender}
          onEndReached={loadMore}
          loadingMore={!showFavorites && loadingMore}
        />
      )}

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => setFilterModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="#fff" />
      </TouchableOpacity>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites((prev) => !prev)}
        selectedSort={sortBy}
        onSelectSort={(sort) => setSortBy(sort)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#472fd4",
    borderRadius: 50,
    padding: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
});
