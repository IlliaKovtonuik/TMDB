import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageCarousel } from "@/components/ImageCarousel";
import { getImageUrl } from "@/helpers/getImageUrl";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { addFavorite, removeFavorite } from "@/slices/favoritesSlice";
import { formatRuntime, getYear, getRatingString } from "@/helpers/convertors";
import { useMovieDetails } from "@/hooks/useMovieDetails";
const MovieDetailsScreen: React.FC = () => {
  const params = useLocalSearchParams<{ movieId: string }>();
  const movieId = parseInt(params.movieId, 10);
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const { movie, images, loading } = useMovieDetails(movieId);
  const isFavorite = React.useMemo(() => {
    if (!movie) return false;
    return favorites.some((fav) => fav.id === movie.id);
  }, [favorites, movie]);
  const dispatch = useAppDispatch();

  if (loading || !movie) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }
  const handleToggleFavorite = () => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    runtime,
    status,
    genres,
    overview,
    tagline,
    production_countries,
    production_companies,
    homepage,
    budget,
    revenue,
  } = movie;

  const year = getYear(release_date);
  const ratingStr = getRatingString(movie.adult);
  const duration = formatRuntime(runtime || 0);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.backdrop}
          source={{ uri: getImageUrl(backdrop_path, poster_path) }}
          resizeMode="cover"
          onLoadEnd={() => setImageLoading(false)}
        >
          {imageLoading && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <View style={styles.backdropOverlay}>
            <Text style={styles.bigTitle}>{title}</Text>
            <View style={styles.subInfoRow}>
              <Text style={styles.subInfoText}>{year}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.subInfoText}>{ratingStr}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.subInfoText}>{duration}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="gold" />
              <Text style={styles.ratingText}>
                {vote_average.toFixed(1)} / 10
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          {tagline ? (
            <View>
              <Text style={styles.sectionTitle}>Tagline</Text>
              <Text style={styles.tagline}>{tagline}</Text>
            </View>
          ) : null}

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{overview}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Release</Text>
              <Text style={styles.infoValue}>{release_date}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{status}</Text>
            </View>
          </View>

          {genres.length > 0 && (
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Genres</Text>
              <View style={styles.tagContainer}>
                {genres.map((genre) => (
                  <View key={genre.id} style={styles.tag}>
                    <Text style={styles.tagText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {production_countries.length > 0 ? (
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Countries</Text>
                {production_countries.map((pc) => (
                  <Text key={pc.iso_3166_1} style={styles.productionText}>
                    • {pc.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Budget</Text>
              <Text style={styles.infoValue}>
                {budget > 0 ? `$${(budget / 1_000_000).toFixed(1)}M` : "N/A"}
              </Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Revenue</Text>
              <Text style={styles.infoValue}>
                {revenue > 0 ? `$${(revenue / 1_000_000).toFixed(1)}M` : "N/A"}
              </Text>
            </View>
          </View>

          {production_companies.length > 0 && (
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Production Companies</Text>
              <View style={styles.productionList}>
                {production_companies.map((pc) => (
                  <Text key={pc.id} style={styles.productionText}>
                    • {pc.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {images && images.backdrops.length > 0 ? (
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.sectionTitle}>Posters</Text>
                <ImageCarousel images={images.backdrops} />
              </View>
            </View>
          ) : null}
          {homepage ? (
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.sectionTitle}>Links</Text>
                <TouchableOpacity
                  style={styles.homepageButton}
                  onPress={() => Linking.openURL(homepage)}
                >
                  <Text style={styles.homepageButtonText}>Visit Homepage</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={32}
            color="tomato"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },
  backdrop: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
  },
  customHeader: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerButton: {
    padding: 8,
  },
  backdropOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bigTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  subInfoText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 6,
  },
  separator: {
    color: "#fff",
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  tagline: {
    fontStyle: "italic",
    color: "#dde4eb",
    fontSize: 14,
    lineHeight: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
    color: "#b1c9e0",
    marginVertical: 6,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#dde4eb",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    lineHeight: 18,
    color: "#b1c9e0",
    marginVertical: 6,
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 16,
    color: "#dde4eb",
    fontWeight: "700",
    marginVertical: 6,
  },
  homepageButton: {
    alignSelf: "flex-start",
  },
  homepageButtonText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
    marginBottom: 12,
  },

  tag: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 13,
    color: "#333",
  },
  imageLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 5,
  },
  productionList: {
    marginTop: 6,
  },

  productionText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#dde4eb",
    marginBottom: 4,
  },

  infoGroup: {
    marginBottom: 16,
  },
});
