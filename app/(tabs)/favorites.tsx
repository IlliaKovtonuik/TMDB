// app/(tabs)/favorites.tsx
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "@/store/store";
import { MovieCardHorizontal } from "@/components/MovieCardHorizontal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  if (!favorites) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: "#aaa" }}>
          No items in your favorites list.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCardHorizontal movie={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  root: {
    flex: 1,
    backgroundColor: "#030014",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
