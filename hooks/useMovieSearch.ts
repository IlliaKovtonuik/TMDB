import { useState } from "react";
import { searchMoviesAdvanced } from "@/api/tmdb";
import { Movie } from "@/types/movie";

export const useMovieSearch = () => {
  const [titleMatches, setTitleMatches] = useState<Movie[]>([]);
  const [actorMatches, setActorMatches] = useState<Movie[]>([]);
  const [genreMatches, setGenreMatches] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await searchMoviesAdvanced(query);
      setTitleMatches(result.titleMatches);
      setActorMatches(result.actorMatches);
      setGenreMatches(result.genreMatches);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setTitleMatches([]);
    setActorMatches([]);
    setGenreMatches([]);
  };

  return {
    loading,
    titleMatches,
    actorMatches,
    genreMatches,
    search,
    clear,
  };
};
