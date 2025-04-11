import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Movie } from "@/types/movie";
import { useRouter } from "expo-router";
import { defaultImageUrl } from "@/helpers/const";
interface MovieCardProps {
  movie: Movie;
  horizontal?: boolean;
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie, horizontal }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movieDetails/${movie.id}`);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : defaultImageUrl,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="gold" />
          <Text style={styles.rating}>
            {movie.vote_average?.toFixed(1) ?? "N/A"} / 10
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CARD_HEIGHT = 260;

const styles = StyleSheet.create({
  card: {
    minWidth: 140,
    backgroundColor: "#161225",
    borderRadius: 12,
    overflow: "hidden",
    height: CARD_HEIGHT,
  },
  image: {
    width: "100%",
    minWidth: 140,
    height: 190,
  },
  info: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#e5e5e5",
    lineHeight: 16,
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 13,
    color: "#bbb",
  },
});
