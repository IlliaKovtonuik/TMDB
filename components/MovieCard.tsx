import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Movie } from "@/types/movie";
import { useRouter } from "expo-router";
import { defaultImageUrl } from "@/helpers/const";
interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster_path, vote_average } = movie;
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movieDetails/${movie.id}`);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w185${poster_path}`
              : defaultImageUrl,
          }}
          style={styles.poster}
        />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.row}>
          <Ionicons
            name="star"
            size={14}
            color="gold"
            style={{ marginRight: 2 }}
          />
          <Text style={styles.rating}>{vote_average.toFixed(1)} / 10</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    maxWidth: 160,
    alignItems: "center",
  },
  poster: {
    width: 160,
    height: 220,
    borderRadius: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: "#9CA4AB",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    color: "#9CA4AB",
  },
});
