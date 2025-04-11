// src/utils/filterAndSortMovies.ts
import { Movie } from "../types/movie";

export type SortOption = "alphabetical" | "rating" | "newest" | "oldest" | null;

interface FilterOptions {
  onlyFavorites: boolean;
  sortBy: SortOption;
}

export const filterAndSortMovies = (
  allMovies: Movie[],
  favorites: Movie[],
  options: FilterOptions
): Movie[] => {
  const { onlyFavorites, sortBy } = options;

  const source = onlyFavorites ? favorites : allMovies;

  const compareByTitle = (a: Movie, b: Movie) => a.title.localeCompare(b.title);
  const compareByRating = (a: Movie, b: Movie) =>
    b.vote_average - a.vote_average;
  const compareByNewest = (a: Movie, b: Movie) =>
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  const compareByOldest = (a: Movie, b: Movie) =>
    new Date(a.release_date).getTime() - new Date(b.release_date).getTime();

  const sortComparators: Record<
    NonNullable<SortOption>,
    (a: Movie, b: Movie) => number
  > = {
    alphabetical: compareByTitle,
    rating: compareByRating,
    newest: compareByNewest,
    oldest: compareByOldest,
  };

  const comparator = sortBy ? sortComparators[sortBy] : () => 0;

  return [...source].sort(comparator);
};
