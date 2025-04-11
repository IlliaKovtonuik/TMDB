import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MovieCard } from "@/components/MovieCard";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 500);
  const { loading, titleMatches, actorMatches, genreMatches, search, clear } =
    useMovieSearch();

  const handleSearch = async () => {
    await search(query);
    Keyboard.dismiss();
  };
  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      search(debouncedQuery);
    }
  }, [debouncedQuery]);

  const renderSection = (title: string, data: any[]) => {
    if (!data?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginRight: 12 }}>
              <MovieCard movie={item} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const isEmpty =
    !titleMatches.length && !actorMatches.length && !genreMatches.length;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.searchRow}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              placeholder="Search by film name, actor or genres..."
              style={styles.input}
              returnKeyType="search"
            />
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="tomato"
              style={{ marginTop: 24 }}
            />
          ) : (
            <ScrollView
              style={styles.results}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {renderSection("🎬 Film", titleMatches)}
              {renderSection("🎭 Actor", actorMatches)}
              {renderSection("🎞️ Genres", genreMatches)}

              {isEmpty && query.length > 0 && (
                <Text style={styles.emptyText}>Oops nothing here 😢</Text>
              )}
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030014",
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "black",
    backgroundColor: "#f5f6f7",
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  clearBtn: {
    marginLeft: 8,
  },
  results: {
    marginTop: 12,
    marginHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
});
