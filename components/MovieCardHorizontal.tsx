import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Movie } from "@/types/movie";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/store/store";
import { removeFavorite } from "@/store/slices/favoritesSlice";

interface Props {
  movie: Movie;
}

export const MovieCardHorizontal: React.FC<Props> = ({ movie }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handlePress = () => {
    router.push(`/movieDetails/${movie.id}`);
  };

  const handleUnlike = () => {
    dispatch(removeFavorite(movie.id));
  };

  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
            : "https://via.placeholder.com/185x278?text=No+Image",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="star" size={14} color="gold" />
          <Text style={styles.metaText}>
            {movie.vote_average.toFixed(1)} / 10
          </Text>
        </View>
        <Text style={styles.subInfo}>Year: {releaseYear}</Text>
      </View>
      <TouchableOpacity style={styles.unlikeBtn} onPress={handleUnlike}>
        <Ionicons name="heart-dislike" size={20} color="tomato" />
        <Text style={styles.unlikeText}>Unlike</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderColor: "#333",
  },
  image: {
    width: 90,
    height: 130,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
  },
  subInfo: {
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
    marginTop: 4,
  },
  unlikeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  unlikeText: {
    marginLeft: 4,
    fontSize: 14,
    color: "tomato",
  },
});
