import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieImages } from "@/api/tmdb";
import { MovieDetails, MovieImagesResponse } from "@/types/movie";

export const useMovieDetails = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [images, setImages] = useState<MovieImagesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        const imagesData = await fetchMovieImages(movieId);
        setMovie(movieData);
        setImages(imagesData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [movieId]);

  return { movie, images, loading };
};
