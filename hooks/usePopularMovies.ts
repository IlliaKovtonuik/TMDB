import { useEffect, useState } from "react";
import { fetchPopularMovies } from "@/api/tmdb";
import { Movie } from "@/types/movie";

export const usePopularMovies = (enabled: boolean = true) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadMovies = async (pageToLoad: number, append: boolean = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      const data = await fetchPopularMovies(pageToLoad);
      if (append) {
        setMovies((prev) => [...prev, ...data]);
      } else {
        setMovies(data);
      }
    } catch (error) {
      console.error("Failed to load movies", error);
    } finally {
      append ? setLoadingMore(false) : setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage, true);
  };

  useEffect(() => {
    if (enabled) {
      loadMovies(1);
    }
  }, [enabled]);

  return {
    movies,
    page,
    loading,
    loadingMore,
    loadMore,
  };
};
